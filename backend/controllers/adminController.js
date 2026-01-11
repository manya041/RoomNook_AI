const { validationResult } = require('express-validator');
const Student = require('../models/Student');
const PgOwner = require('../models/PgOwner');
const PgListing = require('../models/PgListing');
const MessListing = require('../models/MessListing');
const Review = require('../models/Review');
const Admin = require('../models/Admin');
const { Op } = require('sequelize');

// Get admin dashboard overview
const getAdminDashboard = async (req, res) => {
  try {
    const [
      totalStudents,
      totalOwners,
      totalPgListings,
      totalMessListings,
      pendingVerifications,
      recentStudents,
      recentOwners,
      recentListings
    ] = await Promise.all([
      Student.count(),
      PgOwner.count(),
      PgListing.count(),
      MessListing.count(),
      PgListing.count({ where: { verification_status: 'pending' } }),
      Student.findAll({
        limit: 5,
        order: [['created_at', 'DESC']],
        attributes: ['id', 'name', 'email', 'university', 'created_at']
      }),
      PgOwner.findAll({
        limit: 5,
        order: [['created_at', 'DESC']],
        attributes: ['id', 'name', 'email', 'verification_status', 'created_at']
      }),
      PgListing.findAll({
        limit: 5,
        order: [['created_at', 'DESC']],
        include: [{
          model: PgOwner,
          as: 'owner',
          attributes: ['name']
        }],
        attributes: ['id', 'title', 'location', 'rent_amount', 'verification_status', 'created_at']
      })
    ]);

    res.json({
      overview: {
        totalStudents,
        totalOwners,
        totalPgListings,
        totalMessListings,
        pendingVerifications
      },
      recent: {
        students: recentStudents,
        owners: recentOwners,
        listings: recentListings
      }
    });

  } catch (error) {
    console.error('Get admin dashboard error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};

// Get all students with pagination and filters
const getAllStudents = async (req, res) => {
  try {
    const { 
      search, 
      university, 
      page = 1, 
      limit = 10 
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }

    if (university) {
      whereClause.university = { [Op.like]: `%${university}%` };
    }

    const { count, rows: students } = await Student.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      students,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get all students error:', error);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};

// Get all PG owners with pagination and filters
const getAllOwners = async (req, res) => {
  try {
    const { 
      search, 
      verification_status, 
      page = 1, 
      limit = 10 
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ];
    }

    if (verification_status) {
      whereClause.verification_status = verification_status;
    }

    const { count, rows: owners } = await PgOwner.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      owners,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get all owners error:', error);
    res.status(500).json({ message: 'Failed to fetch owners' });
  }
};

// Get all PG listings with admin controls
const getAllPgListings = async (req, res) => {
  try {
    const { 
      search, 
      location, 
      verification_status, 
      status,
      page = 1, 
      limit = 10 
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    if (location) {
      whereClause.location = { [Op.like]: `%${location}%` };
    }

    if (verification_status) {
      whereClause.verification_status = verification_status;
    }

    if (status) {
      whereClause.status = status;
    }

    const { count, rows: pgListings } = await PgListing.findAndCountAll({
      where: whereClause,
      include: [{
        model: PgOwner,
        as: 'owner',
        attributes: ['name', 'email', 'verification_status']
      }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      pgListings,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get all PG listings error:', error);
    res.status(500).json({ message: 'Failed to fetch PG listings' });
  }
};

// Verify PG listing
const verifyPgListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { verification_status } = req.body;

    if (!['verified', 'rejected'].includes(verification_status)) {
      return res.status(400).json({ message: 'Invalid verification status' });
    }

    const pgListing = await PgListing.findByPk(id);
    if (!pgListing) {
      return res.status(404).json({ message: 'PG listing not found' });
    }

    await pgListing.update({ verification_status });

    res.json({
      message: `PG listing ${verification_status} successfully`,
      pgListing
    });

  } catch (error) {
    console.error('Verify PG listing error:', error);
    res.status(500).json({ message: 'Failed to verify PG listing' });
  }
};

// Verify PG owner
const verifyPgOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const { verification_status } = req.body;

    if (!['verified', 'rejected'].includes(verification_status)) {
      return res.status(400).json({ message: 'Invalid verification status' });
    }

    const owner = await PgOwner.findByPk(id);
    if (!owner) {
      return res.status(404).json({ message: 'PG owner not found' });
    }

    await owner.update({ verification_status });

    res.json({
      message: `PG owner ${verification_status} successfully`,
      owner
    });

  } catch (error) {
    console.error('Verify PG owner error:', error);
    res.status(500).json({ message: 'Failed to verify PG owner' });
  }
};

// Block/Unblock user
const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { userType, isBlocked } = req.body;

    if (!['student', 'owner'].includes(userType)) {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    let user;
    if (userType === 'student') {
      user = await Student.findByPk(id);
    } else {
      user = await PgOwner.findByPk(id);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // For this example, we'll use a simple blocked field
    // In a real app, you might want to add a status field to the models
    await user.update({ is_blocked: isBlocked });

    res.json({
      message: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
      user
    });

  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({ message: 'Failed to update user status' });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const { 
      review_type, 
      rating,
      page = 1, 
      limit = 10 
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {};

    if (review_type) {
      whereClause.review_type = review_type;
    }

    if (rating) {
      whereClause.rating = rating;
    }

    const { count, rows: reviews } = await Review.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email']
        },
        {
          model: PgListing,
          as: 'pgListing',
          attributes: ['title', 'location']
        },
        {
          model: MessListing,
          as: 'messListing',
          attributes: ['name', 'location']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      reviews,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get all reviews error:', error);
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

module.exports = {
  getAdminDashboard,
  getAllStudents,
  getAllOwners,
  getAllPgListings,
  verifyPgListing,
  verifyPgOwner,
  toggleUserStatus,
  getAllReviews
};
