const express = require('express');
const { body } = require('express-validator');
const {
  registerStudent,
  loginStudent,
  registerOwner,
  loginOwner,
  loginAdmin,
  getProfile,
  updateProfile,
  refreshAccessToken,
  logout
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

// Validation rules
const studentRegistrationValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('food_preference').optional().isIn(['veg', 'non-veg', 'both']).withMessage('Valid food preference required'),
  body('cleanliness_level').optional().isIn(['very_clean', 'moderate', 'casual']).withMessage('Valid cleanliness level required'),
  body('lifestyle').optional().isIn(['early_bird', 'night_owl', 'flexible']).withMessage('Valid lifestyle required'),
  body('smoking_preference').optional().isIn(['non_smoker', 'smoker', 'okay_with_smoking']).withMessage('Valid smoking preference required')
];

const ownerRegistrationValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number required'),
  body('address').optional().notEmpty().withMessage('Address is required')
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const profileUpdateValidation = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number required')
];

// Public routes
router.post('/register/student', rateLimiter({ windowMs: 60000, max: 20 }), studentRegistrationValidation, registerStudent);
router.post('/login/student', rateLimiter({ windowMs: 60000, max: 30 }), loginValidation, loginStudent);
router.post('/register/owner', rateLimiter({ windowMs: 60000, max: 20 }), ownerRegistrationValidation, registerOwner);
router.post('/login/owner', rateLimiter({ windowMs: 60000, max: 30 }), loginValidation, loginOwner);
router.post('/login/admin', rateLimiter({ windowMs: 60000, max: 30 }), loginValidation, loginAdmin);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, profileUpdateValidation, updateProfile);

// Token refresh & logout
router.post('/refresh', rateLimiter({ windowMs: 60000, max: 20 }), [body('refreshToken').notEmpty()], refreshAccessToken);
router.post('/logout', rateLimiter({ windowMs: 60000, max: 50 }), logout);

// Password reset
router.post('/forgot-password', rateLimiter({ windowMs: 60000, max: 10 }), [body('email').isEmail(), body('role').optional().isIn(['student','owner','admin'])], require('../controllers/authController').forgotPassword);
router.post('/reset-password', [body('token').notEmpty(), body('password').isLength({ min: 6 })], require('../controllers/authController').resetPassword);
router.post('/resend-verification', rateLimiter({ windowMs: 60000, max: 10 }), [body('email').isEmail(), body('role').optional().isIn(['student','owner'])], require('../controllers/authController').resendVerification);
router.get('/verify-email', require('../controllers/authController').verifyEmail);

module.exports = router;
