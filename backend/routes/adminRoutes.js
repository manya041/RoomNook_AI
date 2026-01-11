const express = require('express');
const { body, query } = require('express-validator');
const {
  getAdminDashboard,
  getAllStudents,
  getAllOwners,
  getAllPgListings,
  verifyPgListing,
  verifyPgOwner,
  toggleUserStatus,
  getAllReviews
} = require('../controllers/adminController');
const { authenticateToken, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const verificationValidation = [
  body('verification_status').isIn(['verified', 'rejected']).withMessage('Valid verification status required')
];

const userStatusValidation = [
  body('userType').isIn(['student', 'owner']).withMessage('Valid user type required'),
  body('isBlocked').isBoolean().withMessage('Blocked status must be boolean')
];

// All routes require admin authentication
router.use(authenticateToken, requireAdmin);

// Dashboard
router.get('/dashboard', getAdminDashboard);

// User management
router.get('/students', getAllStudents);
router.get('/owners', getAllOwners);
router.put('/owners/:id/verify', verificationValidation, verifyPgOwner);
router.put('/users/:id/status', userStatusValidation, toggleUserStatus);

// Listing management
router.get('/pg-listings', getAllPgListings);
router.put('/pg-listings/:id/verify', verificationValidation, verifyPgListing);

// Review management
router.get('/reviews', getAllReviews);

module.exports = router;
