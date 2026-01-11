const express = require('express');
const { body, query } = require('express-validator');
const {
  chatWithAI,
  getRecommendations,
  getCompatibilityAnalysis,
  getPerfectMatchScore
} = require('../controllers/aiController');
const { authenticateToken, requireStudent, optionalAuth } = require('../middleware/authMiddleware');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

// Validation rules
const chatValidation = [
  body('query').notEmpty().withMessage('Query is required'),
  body('query').isLength({ min: 1, max: 500 }).withMessage('Query must be between 1 and 500 characters')
];

const recommendationsValidation = [
  query('limit').optional().isInt({ min: 1, max: 20 }).withMessage('Limit must be between 1 and 20')
];

const perfectMatchValidation = [
  query('pgId').isInt().withMessage('Valid PG ID required'),
  query('roommateId').optional().isInt().withMessage('Valid roommate ID required'),
  query('messId').optional().isInt().withMessage('Valid mess ID required')
];

// Public routes
router.post('/assistant', rateLimiter({ windowMs: 60000, max: 10 }), optionalAuth, chatValidation, chatWithAI);

// Protected routes (require student authentication)
router.get('/recommendations', rateLimiter({ windowMs: 60000, max: 30, keyGenerator: (req) => req.user ? `${req.userRole}:${req.user.id}` : req.ip }), authenticateToken, requireStudent, recommendationsValidation, getRecommendations);
router.get('/compatibility/:roommateId', authenticateToken, requireStudent, getCompatibilityAnalysis);
router.get('/perfect-match-score', authenticateToken, requireStudent, perfectMatchValidation, getPerfectMatchScore);

module.exports = router;
