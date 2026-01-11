const { validationResult } = require('express-validator');
const { generateAIResponse, generateRecommendations } = require('../utils/matchScore');
const { InferenceClient } = require('@huggingface/inference');
const Student = require('../models/Student');
const PgListing = require('../models/PgListing');
const MessListing = require('../models/MessListing');
const RoommateProfile = require('../models/RoommateProfile');
const cache = require('../utils/cache')

// Initialize Hugging Face client
const { env } = require('../config/config');
const hfToken = env.ai.hfToken;
const hfClient = hfToken ? new InferenceClient(hfToken) : null;

// AI Assistant Chat Endpoint
const chatWithAI = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ message: "Query required" });
    }

    // Get student profile if authenticated
    let student = null;
    if (req.user && req.userRole === 'student') {
      student = req.user;
    } else {
      // Create a default student profile for unauthenticated users
      student = {
        id: 0,
        budget_min: 3000,
        budget_max: 8000,
        preferred_location: 'Clement Town',
        food_preference: 'both',
        cleanliness_level: 'moderate',
        lifestyle: 'flexible',
        smoking_preference: 'non_smoker'
      };
    }

    const cacheKey = req.user && req.userRole === 'student' ? `recommendations:student:${req.user.id}:limit:10` : null
    let cached = cacheKey ? cache.get(cacheKey) : null
    let pgListings, students, messListings
    if (!cached) {
      const data = await Promise.all([
        PgListing.findAll({
          where: { verification_status: 'verified', status: 'active' },
          include: ['owner']
        }),
        Student.findAll({
          include: [
            {
              model: RoommateProfile,
              as: 'roommateProfile'
            }
          ]
        }),
        MessListing.findAll({ where: { status: 'active' } })
      ])
      pgListings = data[0]
      students = data[1]
      messListings = data[2]
    } else {
      pgListings = cached.pgListings
      students = cached.students
      messListings = cached.messListings
    }

    // Generate recommendations
    const recommendations = generateRecommendations(student, pgListings, students, messListings, 10);
    if (!cached && cacheKey) {
      cache.set(cacheKey, { pgListings, students, messListings, recommendations }, 5 * 60 * 1000)
    }

    let aiResponse;
    
    try {
      // Use Hugging Face API for AI response
      const systemPrompt = `You are RoomNook AI, a helpful assistant for finding PG accommodations, roommates, and mess services in Dehradun, India. 
      
      Student Profile: Budget ₹${student.budget_min}-${student.budget_max}, Location: ${student.preferred_location}, Food: ${student.food_preference}, Lifestyle: ${student.lifestyle}
      
      Available PGs: ${pgListings.length} verified listings
      Available Roommates: ${students.length} profiles
      Available Mess: ${messListings.length} services
      
      Provide helpful, specific advice about PG accommodations, roommate matching, or mess services. Be conversational and informative.`;

      if (hfClient) {
        const chatCompletion = await hfClient.chatCompletion({
          model: env.ai.model,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: query
            }
          ],
          max_tokens: 200,
          temperature: 0.7
        });

        const aiMessage = chatCompletion.choices[0].message.content;
        
        aiResponse = {
          message: aiMessage,
          recommendations: recommendations.slice(0, 3), // Show top 3 recommendations
          totalFound: recommendations.length,
          studentProfile: {
            budget: `₹${student.budget_min}-${student.budget_max}`,
            location: student.preferred_location,
            foodPreference: student.food_preference,
            lifestyle: student.lifestyle
          }
        };
      } else {
        throw new Error('HF token not configured');
      }

    } catch (hfError) {
      console.error('Hugging Face API error:', hfError);
      // Fallback to local AI response
      aiResponse = generateAIResponse(query, student, recommendations);
    }

    res.json({
      message: aiResponse.message,
      recommendations: aiResponse.recommendations,
      totalFound: aiResponse.totalFound,
      studentProfile: aiResponse.studentProfile,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ message: 'AI assistant is temporarily unavailable' });
  }
};

// Get personalized recommendations
const getRecommendations = async (req, res) => {
  try {
    if (!req.user || req.userRole !== 'student') {
      return res.status(401).json({ message: 'Student authentication required' });
    }

    const student = req.user;
    const { limit = 5 } = req.query;

    const cacheKey = `recommendations:student:${student.id}:limit:${parseInt(limit)}`
    let cached = cache.get(cacheKey)
    let pgListings, students, messListings
    if (!cached) {
      const data = await Promise.all([
        PgListing.findAll({
          where: { status: 'active', verification_status: 'verified' },
          include: ['owner']
        }),
        Student.findAll({
          include: [
            {
              model: RoommateProfile,
              as: 'roommateProfile'
            }
          ]
        }),
        MessListing.findAll({ where: { status: 'active' } })
      ])
      pgListings = data[0]
      students = data[1]
      messListings = data[2]
    } else {
      pgListings = cached.pgListings
      students = cached.students
      messListings = cached.messListings
    }

    // Generate recommendations
    const recommendations = generateRecommendations(student, pgListings, students, messListings, parseInt(limit));
    if (!cached) {
      cache.set(cacheKey, { pgListings, students, messListings, recommendations }, 5 * 60 * 1000)
    }

    res.json({
      recommendations,
      studentProfile: {
        budget: `${student.budget_min}-${student.budget_max}`,
        location: student.preferred_location,
        foodPreference: student.food_preference,
        lifestyle: student.lifestyle
      }
    });

  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ message: 'Failed to generate recommendations' });
  }
};

// Get compatibility analysis
const getCompatibilityAnalysis = async (req, res) => {
  try {
    if (!req.user || req.userRole !== 'student') {
      return res.status(401).json({ message: 'Student authentication required' });
    }

    const student = req.user;
    const { roommateId } = req.params;

    if (!roommateId) {
      return res.status(400).json({ message: 'Roommate ID required' });
    }

    // Find roommate
    const roommate = await Student.findByPk(roommateId);
    if (!roommate) {
      return res.status(404).json({ message: 'Roommate not found' });
    }

    // Calculate compatibility
    const { calculateCompatibility } = require('../utils/compatibility');
    const compatibilityScore = calculateCompatibility(student, roommate);

    // Get detailed analysis
    const analysis = {
      overallScore: compatibilityScore,
      studentProfile: {
        name: student.name,
        foodPreference: student.food_preference,
        cleanlinessLevel: student.cleanliness_level,
        lifestyle: student.lifestyle,
        smokingPreference: student.smoking_preference
      },
      roommateProfile: {
        name: roommate.name,
        foodPreference: roommate.food_preference,
        cleanlinessLevel: roommate.cleanliness_level,
        lifestyle: roommate.lifestyle,
        smokingPreference: roommate.smoking_preference
      },
      compatibilityBreakdown: {
        food: student.food_preference === roommate.food_preference ? 'Perfect Match' : 'Different Preferences',
        cleanliness: student.cleanliness_level === roommate.cleanliness_level ? 'Perfect Match' : 'Different Levels',
        lifestyle: student.lifestyle === roommate.lifestyle ? 'Perfect Match' : 'Different Schedules',
        smoking: student.smoking_preference === roommate.smoking_preference ? 'Compatible' : 'May Need Discussion'
      }
    };

    res.json(analysis);

  } catch (error) {
    console.error('Compatibility analysis error:', error);
    res.status(500).json({ message: 'Failed to analyze compatibility' });
  }
};

// Get Perfect Match Score™ for specific combination
const getPerfectMatchScore = async (req, res) => {
  try {
    if (!req.user || req.userRole !== 'student') {
      return res.status(401).json({ message: 'Student authentication required' });
    }

    const student = req.user;
    const { pgId, roommateId, messId } = req.query;

    if (!pgId) {
      return res.status(400).json({ message: 'PG ID required' });
    }

    // Get PG listing
    const pgListing = await PgListing.findByPk(pgId);
    if (!pgListing) {
      return res.status(404).json({ message: 'PG listing not found' });
    }

    let roommate = null;
    let messListing = null;

    // Get roommate if provided
    if (roommateId) {
      roommate = await Student.findByPk(roommateId);
      if (!roommate) {
        return res.status(404).json({ message: 'Roommate not found' });
      }
    }

    // Get mess if provided
    if (messId) {
      messListing = await MessListing.findByPk(messId);
      if (!messListing) {
        return res.status(404).json({ message: 'Mess listing not found' });
      }
    }

    // Calculate Perfect Match Score™
    const { calculateCompleteMatchScore } = require('../utils/matchScore');
    const matchAnalysis = calculateCompleteMatchScore(student, pgListing, roommate, messListing);

    res.json({
      perfectMatchScore: matchAnalysis.perfectMatchScore,
      breakdown: matchAnalysis.breakdown,
      totalMonthlyCost: pgListing.rent_amount + (messListing ? messListing.monthly_cost : 0),
      recommendations: matchAnalysis.perfectMatchScore >= 80 ? 'Excellent Match!' : 
                      matchAnalysis.perfectMatchScore >= 60 ? 'Good Match' : 
                      matchAnalysis.perfectMatchScore >= 40 ? 'Fair Match' : 'Consider Other Options'
    });

  } catch (error) {
    console.error('Perfect match score error:', error);
    res.status(500).json({ message: 'Failed to calculate match score' });
  }
};

module.exports = {
  chatWithAI,
  getRecommendations,
  getCompatibilityAnalysis,
  getPerfectMatchScore
};
