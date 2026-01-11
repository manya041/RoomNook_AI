const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const PgOwner = require('../models/PgOwner');
const Admin = require('../models/Admin');

// JWT Authentication Middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const { env } = require('../config/config');
    const decoded = jwt.verify(token, env.jwt.secret);
    
    // Find user based on role
    let user = null;
    switch (decoded.role) {
      case 'student':
        user = await Student.findByPk(decoded.id);
        break;
      case 'owner':
        user = await PgOwner.findByPk(decoded.id);
        break;
      case 'admin':
        user = await Admin.findByPk(decoded.id);
        break;
      default:
        return res.status(401).json({ message: 'Invalid token' });
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (typeof user.token_version !== 'undefined' && decoded.tokenVersion !== user.token_version) {
      return res.status(401).json({ message: 'Token has been revoked' });
    }

    if (user.is_blocked) {
      return res.status(403).json({ message: 'Account blocked' });
    }

    if (decoded.role !== 'admin' && typeof user.email_verified !== 'undefined' && user.email_verified === false) {
      return res.status(403).json({ message: 'Email not verified' });
    }

    req.user = user;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Role-based authorization middleware
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
};

// Student-specific middleware
const requireStudent = authorizeRole('student');

// Owner-specific middleware
const requireOwner = authorizeRole('owner');

// Admin-specific middleware
const requireAdmin = authorizeRole('admin');

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const { env } = require('../config/config');
      const decoded = jwt.verify(token, env.jwt.secret);
      
      let user = null;
      switch (decoded.role) {
        case 'student':
          user = await Student.findByPk(decoded.id);
          break;
        case 'owner':
          user = await PgOwner.findByPk(decoded.id);
          break;
        case 'admin':
          user = await Admin.findByPk(decoded.id);
          break;
      }

      if (user) {
        req.user = user;
        req.userRole = decoded.role;
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};

module.exports = {
  authenticateToken,
  authorizeRole,
  requireStudent,
  requireOwner,
  requireAdmin,
  optionalAuth
};
