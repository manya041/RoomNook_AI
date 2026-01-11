const { validationResult } = require('express-validator');
const PgListing = require('../models/PgListing');
const PgOwner = require('../models/PgOwner');
const Review = require('../models/Review');
const { Op } = require('sequelize');

// Create PG listing
const createPgListing = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ownerId = req.user.id;
    const {
      title,
      description,
      address,
      location,
      rent_amount,
      deposit_amount,
      room_type,
      gender_preference = 'any',
      available_from,
      amenities = [],
      images = [],
      rules,
      status = 'active'
    } = req.body;

    const pgListing = await PgListing.create({
      owner_id: ownerId,
      title,
      description,
      address,
      location,
      rent_amount,
      deposit_amount,
      room_type,
      gender_preference,
      available_from,
      amenities,
      images,
      rules,
      status
    });

    res.status(201).json({
      message: 'PG listing created successfully',
      pgListing
    });

  } catch (error) {
    console.error('Create PG listing error:', error);
    res.status(500).json({ message: 'Failed to create PG listing' });
  }
};

// Get owner's PG listings
const getOwnerPgListings = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { status, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = { owner_id: ownerId };

    if (status) {
      whereClause.status = status;
    }

    const { count, rows: pgListings } = await PgListing.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Review,
          as: 'reviews',
          include: [
            {
              model: require('../models/Student'),
              as: 'student',
              attributes: ['name']
            }
          ]
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    // Calculate average ratings
    const pgListingsWithRatings = pgListings.map(pg => {
      const reviews = pg.reviews || [];
      const avgRating = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;

      return {
        ...pg.toJSON(),
        avgRating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews.length
      };
    });

    res.json({
      pgListings: pgListingsWithRatings,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get owner PG listings error:', error);
    res.status(500).json({ message: 'Failed to fetch PG listings' });
  }
};

// Update PG listing
const updatePgListing = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const ownerId = req.user.id;

    const pgListing = await PgListing.findOne({
      where: { id, owner_id: ownerId }
    });

    if (!pgListing) {
      return res.status(404).json({ message: 'PG listing not found' });
    }

    const updateData = { ...req.body };
    delete updateData.id;
    delete updateData.owner_id;
    delete updateData.created_at;
    delete updateData.updated_at;
    delete updateData.verification_status; // Admin controls verification

    await pgListing.update(updateData);

    res.json({
      message: 'PG listing updated successfully',
      pgListing
    });

  } catch (error) {
    console.error('Update PG listing error:', error);
    res.status(500).json({ message: 'Failed to update PG listing' });
  }
};

// Delete PG listing
const deletePgListing = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = req.user.id;

    const pgListing = await PgListing.findOne({
      where: { id, owner_id: ownerId }
    });

    if (!pgListing) {
      return res.status(404).json({ message: 'PG listing not found' });
    }

    await pgListing.destroy();

    res.json({ message: 'PG listing deleted successfully' });

  } catch (error) {
    console.error('Delete PG listing error:', error);
    res.status(500).json({ message: 'Failed to delete PG listing' });
  }
};

// Get owner dashboard stats
const getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const [
      totalListings,
      activeListings,
      bookedListings,
      totalReviews,
      avgRating,
      totalApplications
    ] = await Promise.all([
      PgListing.count({ where: { owner_id: ownerId } }),
      PgListing.count({ where: { owner_id: ownerId, status: 'active' } }),
      PgListing.count({ where: { owner_id: ownerId, status: 'booked' } }),
      Review.count({
        include: [{
          model: PgListing,
          as: 'pgListing',
          where: { owner_id: ownerId }
        }]
      }),
      Review.findOne({
        attributes: [
          [require('sequelize').fn('AVG', require('sequelize').col('rating')), 'avgRating']
        ],
        include: [{
          model: PgListing,
          as: 'pgListing',
          where: { owner_id: ownerId },
          attributes: []
        }],
        raw: true
      }),
      require('../models/PgApplication').count({
        include: [{
          model: PgListing,
          as: 'pgListing',
          where: { owner_id: ownerId },
          attributes: []
        }]
      })
    ]);

    res.json({
      stats: {
        totalListings,
        activeListings,
        bookedListings,
        totalReviews,
        avgRating: avgRating ? Math.round(avgRating.avgRating * 10) / 10 : 0,
        totalApplications
      }
    });

  } catch (error) {
    console.error('Get owner dashboard error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};

// Get owner profile
const getOwnerProfile = async (req, res) => {
  try {
    const owner = await PgOwner.findByPk(req.user.id);
    res.json(owner);
  } catch (error) {
    console.error('Get owner profile error:', error);
    res.status(500).json({ message: 'Failed to fetch owner profile' });
  }
};

// Update owner profile
const updateOwnerProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updateData = { ...req.body };
    delete updateData.password;
    delete updateData.id;
    delete updateData.created_at;
    delete updateData.updated_at;

    await req.user.update(updateData);

    res.json({
      message: 'Profile updated successfully',
      owner: req.user
    });

  } catch (error) {
    console.error('Update owner profile error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

module.exports = {
  createPgListing,
  getOwnerPgListings,
  updatePgListing,
  deletePgListing,
  getOwnerDashboard,
  getOwnerProfile,
  updateOwnerProfile
};
