const express = require('express');
const { body, query } = require('express-validator');
const {
  createPgListing,
  getOwnerPgListings,
  updatePgListing,
  deletePgListing,
  getOwnerDashboard,
  getOwnerProfile,
  updateOwnerProfile
} = require('../controllers/ownerController');
const { authenticateToken, requireOwner } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const pgListingValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isLength({ max: 2000 }).withMessage('Description must be less than 2000 characters'),
  body('address').notEmpty().withMessage('Address is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('rent_amount').isInt({ min: 1000 }).withMessage('Valid rent amount required'),
  body('deposit_amount').optional().isInt({ min: 0 }).withMessage('Valid deposit amount required'),
  body('room_type').isIn(['single', 'double', 'triple', 'quad']).withMessage('Valid room type required'),
  body('gender_preference').optional().isIn(['male', 'female', 'any']).withMessage('Valid gender preference required'),
  body('available_from').optional().isISO8601().withMessage('Valid date required'),
  body('amenities').optional().isArray().withMessage('Amenities must be an array'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('status').optional().isIn(['active', 'inactive', 'booked']).withMessage('Valid status required'),
  body('rules').optional().isLength({ max: 1000 }).withMessage('Rules must be less than 1000 characters')
];

const profileUpdateValidation = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number required'),
  body('address').optional().notEmpty().withMessage('Address is required')
];

// All routes require owner authentication
router.use(authenticateToken, requireOwner);

// PG Listing management
router.post('/pg-listings', pgListingValidation, createPgListing);
router.get('/pg-listings', getOwnerPgListings);
router.put('/pg-listings/:id', pgListingValidation, updatePgListing);
router.delete('/pg-listings/:id', deletePgListing);

// Dashboard and profile
router.get('/dashboard', getOwnerDashboard);
router.get('/profile', getOwnerProfile);
router.put('/profile', profileUpdateValidation, updateOwnerProfile);

module.exports = router;
