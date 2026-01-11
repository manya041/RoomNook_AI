// Match Score Calculation Utilities

const {
  calculateCompatibility,
  calculatePgCompatibility,
  calculateMessCompatibility,
  perfectMatchScore,
  findCompatibleRoommates
} = require('./compatibility');

/**
 * Calculate overall match score for a complete housing solution
 * @param {Object} student - Student profile
 * @param {Object} pgListing - PG listing
 * @param {Object} roommate - Potential roommate
 * @param {Object} messListing - Mess listing
 * @returns {Object} Complete match analysis
 */
function calculateCompleteMatchScore(student, pgListing, roommate, messListing) {
  const pgScore = calculatePgCompatibility(student, pgListing);
  const roommateScore = roommate ? calculateCompatibility(student, roommate) : 0;
  const messScore = messListing ? calculateMessCompatibility(student, messListing) : 0;
  
  const perfectScore = perfectMatchScore(pgScore, roommateScore, messScore);
  
  return {
    perfectMatchScore: perfectScore,
    pgScore,
    roommateScore,
    messScore,
    breakdown: {
      pg: { score: pgScore, weight: 0.4 },
      roommate: { score: roommateScore, weight: 0.4 },
      mess: { score: messScore, weight: 0.2 }
    }
  };
}

/**
 * Generate personalized recommendations for a student
 * @param {Object} student - Student profile
 * @param {Array} pgListings - Available PG listings
 * @param {Array} students - All students for roommate matching
 * @param {Array} messListings - Available mess listings
 * @param {number} limit - Number of recommendations
 * @returns {Array} Array of recommendations with scores
 */
function normalizeRecord(record) {
  if (record && typeof record.get === 'function') {
    return record.get({ plain: true });
  }
  return record;
}

function generateRecommendations(student, pgListings, students, messListings, limit = 5) {
  const recommendations = [];
  const normalizedStudent = normalizeRecord(student);
  
  // Filter active PG listings
  const activePgListings = pgListings
    .map(normalizeRecord)
    .filter(pg => pg.status === 'active' && pg.verification_status === 'verified');
  
  // Filter active mess listings
  const activeMessListings = messListings
    .map(normalizeRecord)
    .filter(mess => mess.status === 'active');
  
  // Find compatible roommates
  const compatibleRoommates = findCompatibleRoommates(
    normalizedStudent,
    students.map(normalizeRecord),
    10
  );
  
  // Generate combinations
  activePgListings.forEach(pg => {
    // Try with different roommates
    compatibleRoommates.forEach(({ student: roommate, compatibilityScore }) => {
      // Try with different mess options
      activeMessListings.forEach(mess => {
        const matchAnalysis = calculateCompleteMatchScore(
          normalizedStudent,
          pg,
          roommate,
          mess
        );
        
        recommendations.push({
          pg: {
            id: pg.id,
            title: pg.title,
            location: pg.location,
            rent_amount: pg.rent_amount,
            room_type: pg.room_type,
            amenities: pg.amenities
          },
          roommate: {
            id: roommate.id,
            name: roommate.name,
            university: roommate.university,
            course: roommate.course,
            bio: roommate.roommateProfile?.bio || roommate.bio || 'No bio available',
            compatibility_score: compatibilityScore
          },
          mess: {
            id: mess.id,
            name: mess.name,
            location: mess.location,
            monthly_cost: mess.monthly_cost,
            food_type: mess.food_type,
            rating: mess.rating
          },
          perfectMatchScore: matchAnalysis.perfectMatchScore,
          breakdown: matchAnalysis.breakdown,
          totalMonthlyCost: pg.rent_amount + mess.monthly_cost
        });
      });
    });
  });
  
  // Sort by perfect match score and return top recommendations
  return recommendations
    .sort((a, b) => b.perfectMatchScore - a.perfectMatchScore)
    .slice(0, limit);
}

/**
 * Calculate budget feasibility score
 * @param {Object} student - Student profile
 * @param {number} totalCost - Total monthly cost (PG + Mess)
 * @returns {number} Budget feasibility score (0-100)
 */
function calculateBudgetFeasibility(student, totalCost) {
  const avgBudget = (student.budget_min + student.budget_max) / 2;
  
  if (totalCost <= student.budget_min) {
    return 100; // Excellent - within minimum budget
  } else if (totalCost <= avgBudget) {
    return 80; // Good - within average budget
  } else if (totalCost <= student.budget_max) {
    return 60; // Acceptable - within maximum budget
  } else {
    return Math.max(0, 100 - ((totalCost - student.budget_max) / student.budget_max) * 100);
  }
}

/**
 * Generate AI assistant response based on student query
 * @param {string} query - Student's query
 * @param {Object} student - Student profile
 * @param {Array} recommendations - Generated recommendations
 * @returns {Object} AI response with recommendations
 */
function generateAIResponse(query, student, recommendations) {
  const normalizedStudent = normalizeRecord(student);
  const budget = parseInt(query.match(/\d+/)?.[0], 10) || normalizedStudent.budget_max;
  const location =
    query.match(/near\s+([a-zA-Z\s]+)/i)?.[1]?.trim() || normalizedStudent.preferred_location || '';
  
  // Filter recommendations based on query
  const filteredRecommendations = recommendations.filter(rec => 
    (!budget || rec.totalMonthlyCost <= budget) &&
    (!location || rec.pg.location.toLowerCase().includes(location.toLowerCase()))
  );
  
  const topRecommendations = filteredRecommendations.slice(0, 3);
  
  return {
    message: `Here are the top PGs under ₹${budget} near ${location} with Perfect Match Scores™:`,
    recommendations: topRecommendations.map(rec => ({
      pg: rec.pg.title,
      roommate: rec.roommate.name,
      mess: rec.mess.name,
      score: rec.perfectMatchScore,
      totalCost: rec.totalMonthlyCost,
      breakdown: rec.breakdown
    })),
    totalFound: filteredRecommendations.length,
    studentProfile: {
      budget: `${normalizedStudent.budget_min}-${normalizedStudent.budget_max}`,
      location: normalizedStudent.preferred_location,
      foodPreference: normalizedStudent.food_preference,
      lifestyle: normalizedStudent.lifestyle
    }
  };
}

module.exports = {
  calculateCompleteMatchScore,
  generateRecommendations,
  calculateBudgetFeasibility,
  generateAIResponse
};
