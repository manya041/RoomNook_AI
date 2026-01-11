const { validationResult } = require('express-validator');
const Student = require('../models/Student');
const PgListing = require('../models/PgListing');
const MessListing = require('../models/MessListing');
const Review = require('../models/Review');
const Bookmark = require('../models/Bookmark');
const RoommateProfile = require('../models/RoommateProfile');
const { Op } = require('sequelize');

// Get all PG listings with filters
const getPgListings = async (req, res) => {
  try {
    const {
      location,
      minPrice,
      maxPrice,
      roomType,
      sort = 'recent',
      page = 1,
      limit = 10
    } = req.query;

    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 50);
    const offset = (pageNumber - 1) * pageSize;
    const whereClause = {
      verification_status: 'verified',
      status: 'active'
    };

    // Apply filters
    if (location) {
      whereClause.location = { [Op.like]: `%${location}%` };
    }

    if (minPrice || maxPrice) {
      whereClause.rent_amount = {};
      if (minPrice) whereClause.rent_amount[Op.gte] = Math.max(parseInt(minPrice, 10), 0);
      if (maxPrice) whereClause.rent_amount[Op.lte] = Math.max(parseInt(maxPrice, 10), 0);
    }

    if (roomType) {
      whereClause.room_type = roomType;
    }

    let order = [['created_at', 'DESC']];
    if (sort === 'rent_asc') order = [['rent_amount', 'ASC']];
    if (sort === 'rent_desc') order = [['rent_amount', 'DESC']];

    const { count, rows: pgListings } = await PgListing.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: require('../models/PgOwner'),
          as: 'owner',
          attributes: ['name', 'phone', 'verification_status']
        }
      ],
      limit: pageSize,
      offset,
      order
    });

    res.set('Cache-Control', 'public, max-age=60');
    res.json({
      pgListings,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(count / pageSize),
        totalItems: count,
        itemsPerPage: pageSize
      }
    });

  } catch (error) {
    console.error('Get PG listings error:', error);
    res.status(500).json({ success: false, code: 'PG_LISTINGS_FETCH_FAILED', message: 'Failed to fetch PG listings', requestId: req.requestId });
  }
};

// Get PG listing by ID
const getPgListingById = async (req, res) => {
  try {
    const { id } = req.params;

    const pgListing = await PgListing.findByPk(id, {
      include: [
        {
          model: require('../models/PgOwner'),
          as: 'owner',
          attributes: ['name', 'phone', 'email', 'verification_status']
        },
        {
          model: Review,
          as: 'reviews',
          include: [
            {
              model: Student,
              as: 'student',
              attributes: ['name']
            }
          ]
        }
      ]
    });

    if (!pgListing) {
      return res.status(404).json({ message: 'PG listing not found' });
    }

    // Calculate average rating
    const reviews = pgListing.reviews || [];
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;

    res.json({
      ...pgListing.toJSON(),
      avgRating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length
    });

  } catch (error) {
    console.error('Get PG listing error:', error);
    res.status(500).json({ message: 'Failed to fetch PG listing' });
  }
};

// Get all mess listings
const getMessListings = async (req, res) => {
  try {
    const {
      location,
      foodType,
      maxPrice,
      page = 1,
      limit = 10
    } = req.query;

    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 50);
    const offset = (pageNumber - 1) * pageSize;
    const whereClause = {
      status: 'active'
    };

    // Apply filters
    if (location) {
      whereClause.location = { [Op.like]: `%${location}%` };
    }

    if (foodType) {
      whereClause.food_type = { [Op.in]: [foodType, 'both'] };
    }

    if (maxPrice) {
      whereClause.monthly_cost = { [Op.lte]: parseInt(maxPrice, 10) };
    }

    const { count, rows: messListings } = await MessListing.findAndCountAll({
      where: whereClause,
      limit: pageSize,
      offset,
      order: [['rating', 'DESC'], ['created_at', 'DESC']]
    });

    res.set('Cache-Control', 'public, max-age=60');
    res.json({
      messListings,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(count / pageSize),
        totalItems: count,
        itemsPerPage: pageSize
      }
    });

  } catch (error) {
    console.error('Get mess listings error:', error);
    res.status(500).json({ message: 'Failed to fetch mess listings' });
  }
};

// Get mess listing by ID
const getMessListingById = async (req, res) => {
  try {
    const { id } = req.params;

    const messListing = await MessListing.findByPk(id, {
      include: [
        {
          model: Review,
          as: 'reviews',
          include: [
            {
              model: Student,
              as: 'student',
              attributes: ['name']
            }
          ]
        }
      ]
    });

    if (!messListing) {
      return res.status(404).json({ message: 'Mess listing not found' });
    }

    res.json(messListing);

  } catch (error) {
    console.error('Get mess listing error:', error);
    res.status(500).json({ message: 'Failed to fetch mess listing' });
  }
};

// Create or update roommate profile
const updateRoommateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const studentId = req.user.id;
    const { bio, interests, study_schedule, social_level, party_frequency, guest_policy, is_looking_for_roommate } = req.body;

    // Find or create roommate profile
    let roommateProfile = await RoommateProfile.findOne({ where: { student_id: studentId } });
    
    if (roommateProfile) {
      await roommateProfile.update({
        bio,
        interests,
        study_schedule,
        social_level,
        party_frequency,
        guest_policy,
        is_looking_for_roommate
      });
    } else {
      roommateProfile = await RoommateProfile.create({
        student_id: studentId,
        bio,
        interests,
        study_schedule,
        social_level,
        party_frequency,
        guest_policy,
        is_looking_for_roommate
      });
    }

    res.json({
      message: 'Roommate profile updated successfully',
      profile: roommateProfile
    });

  } catch (error) {
    console.error('Update roommate profile error:', error);
    res.status(500).json({ message: 'Failed to update roommate profile' });
  }
};

// Get roommate profile
const getRoommateProfile = async (req, res) => {
  try {
    const studentId = req.user.id;

    const roommateProfile = await RoommateProfile.findOne({ 
      where: { student_id: studentId },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email', 'university', 'course', 'year_of_study']
        }
      ]
    });

    if (!roommateProfile) {
      return res.status(404).json({ message: 'Roommate profile not found' });
    }

    res.json(roommateProfile);

  } catch (error) {
    console.error('Get roommate profile error:', error);
    res.status(500).json({ message: 'Failed to fetch roommate profile' });
  }
};

// Add bookmark
const addBookmark = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const studentId = req.user.id;
    const { pg_listing_id, mess_listing_id, bookmark_type } = req.body;

    if (bookmark_type === 'pg' && !pg_listing_id) {
      return res.status(400).json({ message: 'PG listing ID is required for PG bookmarks' });
    }

    if (bookmark_type === 'mess' && !mess_listing_id) {
      return res.status(400).json({ message: 'Mess listing ID is required for mess bookmarks' });
    }

    // Check if bookmark already exists
    const existingBookmark = await Bookmark.findOne({
      where: {
        student_id: studentId,
        pg_listing_id: pg_listing_id || null,
        mess_listing_id: mess_listing_id || null,
        bookmark_type
      }
    });

    if (existingBookmark) {
      return res.status(400).json({ message: 'Already bookmarked' });
    }

    const bookmark = await Bookmark.create({
      student_id: studentId,
      pg_listing_id,
      mess_listing_id,
      bookmark_type
    });

    res.status(201).json({
      message: 'Bookmarked successfully',
      bookmark
    });

  } catch (error) {
    console.error('Add bookmark error:', error);
    res.status(500).json({ message: 'Failed to add bookmark' });
  }
};

// Get bookmarks
const getBookmarks = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { type } = req.query;

    const whereClause = { student_id: studentId };
    if (type) {
      whereClause.bookmark_type = type;
    }

    const bookmarks = await Bookmark.findAll({
      where: whereClause,
      include: [
        {
          model: PgListing,
          as: 'pgListing',
          include: [
            {
              model: require('../models/PgOwner'),
              as: 'owner',
              attributes: ['name', 'phone']
            }
          ]
        },
        {
          model: MessListing,
          as: 'messListing'
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json(bookmarks);

  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ message: 'Failed to fetch bookmarks' });
  }
};

// Remove bookmark
const removeBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.user.id;

    const bookmark = await Bookmark.findOne({
      where: { id, student_id: studentId }
    });

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    await bookmark.destroy();

    res.json({ message: 'Bookmark removed successfully' });

  } catch (error) {
    console.error('Remove bookmark error:', error);
    res.status(500).json({ message: 'Failed to remove bookmark' });
  }
};

// Add review
const addReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const studentId = req.user.id;
    const { pg_listing_id, mess_listing_id, rating, comment, review_type } = req.body;

    // Check if review already exists
    const existingReview = await Review.findOne({
      where: {
        student_id: studentId,
        pg_listing_id: pg_listing_id || null,
        mess_listing_id: mess_listing_id || null,
        review_type
      }
    });

    if (existingReview) {
      return res.status(400).json({ message: 'Review already exists' });
    }

    if (review_type === 'pg' && !pg_listing_id) {
      return res.status(400).json({ message: 'PG listing ID is required for PG reviews' });
    }

    if (review_type === 'mess' && !mess_listing_id) {
      return res.status(400).json({ message: 'Mess listing ID is required for mess reviews' });
    }

    const review = await Review.create({
      student_id: studentId,
      pg_listing_id,
      mess_listing_id,
      rating,
      comment,
      review_type
    });

    res.status(201).json({
      message: 'Review added successfully',
      review
    });

  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Failed to add review' });
  }
};

module.exports = {
  getPgListings,
  getPgListingById,
  getMessListings,
  getMessListingById,
  updateRoommateProfile,
  getRoommateProfile,
  addBookmark,
  getBookmarks,
  removeBookmark,
  addReview
};
