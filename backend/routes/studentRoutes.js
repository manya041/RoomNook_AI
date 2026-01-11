const express = require('express');
const { body, query } = require('express-validator');
const {
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
} = require('../controllers/studentController');
const { authenticateToken, requireStudent, optionalAuth } = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

// Validation rules
const roommateProfileValidation = [
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
  body('interests').optional().isArray().withMessage('Interests must be an array'),
  body('study_schedule').optional().notEmpty().withMessage('Study schedule is required'),
  body('social_level').optional().isIn(['introvert', 'extrovert', 'ambivert']).withMessage('Valid social level required'),
  body('party_frequency').optional().isIn(['never', 'rarely', 'sometimes', 'often']).withMessage('Valid party frequency required'),
  body('guest_policy').optional().isIn(['strict', 'moderate', 'flexible']).withMessage('Valid guest policy required'),
  body('is_looking_for_roommate').optional().isBoolean().withMessage('Must be boolean value')
];

const bookmarkValidation = [
  body('pg_listing_id').optional().isInt().withMessage('Valid PG listing ID required'),
  body('mess_listing_id').optional().isInt().withMessage('Valid mess listing ID required'),
  body('bookmark_type').isIn(['pg', 'mess']).withMessage('Valid bookmark type required')
];

const reviewValidation = [
  body('pg_listing_id').optional().isInt().withMessage('Valid PG listing ID required'),
  body('mess_listing_id').optional().isInt().withMessage('Valid mess listing ID required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isLength({ max: 1000 }).withMessage('Comment must be less than 1000 characters'),
  body('review_type').isIn(['pg', 'mess']).withMessage('Valid review type required')
];

// Public routes (can be accessed without authentication)
const pgListValidation = [
  query('minPrice').optional().isInt({ min: 0 }),
  query('maxPrice').optional().isInt({ min: 0 }),
  query('roomType').optional().isIn(['single', 'double', 'triple', 'quad']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('sort').optional().isIn(['recent', 'rent_asc', 'rent_desc'])
];
router.get('/pg-listings', rateLimiter({ windowMs: 60000, max: 60 }), optionalAuth, pgListValidation, getPgListings);
router.get('/pg-listings/:id', optionalAuth, getPgListingById);
router.get('/mess-listings', rateLimiter({ windowMs: 60000, max: 60 }), optionalAuth, getMessListings);
router.get('/mess-listings/:id', optionalAuth, getMessListingById);

// Protected routes (require student authentication)
router.get('/roommate-profile', authenticateToken, requireStudent, getRoommateProfile);
router.put('/roommate-profile', authenticateToken, requireStudent, roommateProfileValidation, updateRoommateProfile);

router.post('/bookmarks', authenticateToken, requireStudent, bookmarkValidation, addBookmark);
router.get('/bookmarks', authenticateToken, requireStudent, getBookmarks);
router.delete('/bookmarks/:id', authenticateToken, requireStudent, removeBookmark);

router.post('/reviews', authenticateToken, requireStudent, reviewValidation, addReview);

module.exports = router;
