const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { env } = require('../config/config');
const RefreshToken = require('../models/RefreshToken');
const PasswordResetToken = require('../models/PasswordResetToken');
const EmailVerificationToken = require('../models/EmailVerificationToken');
const { validationResult } = require('express-validator');
const Student = require('../models/Student');
const PgOwner = require('../models/PgOwner');
const Admin = require('../models/Admin');

// Generate JWT token
const generateToken = (id, role, tokenVersion = 0) => {
  return jwt.sign(
    { id, role, tokenVersion },
    env.jwt.secret,
    { expiresIn: env.jwt.expire || '7d' }
  );
};

const createRefreshToken = async (userId, role, ttlDays = 30) => {
  const raw = crypto.randomBytes(48).toString('hex')
  const hash = crypto.createHash('sha256').update(raw).digest('hex')
  const expires = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000)
  await RefreshToken.create({ user_id: userId, user_role: role, token_hash: hash, expires_at: expires, revoked: false })
  return raw
}

const rotateRefreshToken = async (oldRaw) => {
  const oldHash = crypto.createHash('sha256').update(oldRaw).digest('hex')
  const existing = await RefreshToken.findOne({ where: { token_hash: oldHash, revoked: false } })
  if (!existing) return null
  if (existing.expires_at < new Date()) return null
  existing.revoked = true
  await existing.save()
  const newRaw = await createRefreshToken(existing.user_id, existing.user_role)
  const access = generateToken(existing.user_id, existing.user_role)
  return { accessToken: access, refreshToken: newRaw, userId: existing.user_id, role: existing.user_role }
}

// Student Registration
const registerStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone, university, course, year_of_study, budget_min, budget_max, preferred_location, food_preference, cleanliness_level, lifestyle, smoking_preference } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ where: { email } });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists with this email' });
    }

    // Clean up empty strings and convert to appropriate types
    const cleanData = {
      name,
      email,
      password,
      phone: phone && phone.trim() !== '' ? phone : null,
      university: university && university.trim() !== '' ? university : null,
      course: course && course.trim() !== '' ? course : null,
      year_of_study: year_of_study && year_of_study !== '' ? parseInt(year_of_study) : null,
      budget_min: budget_min && budget_min !== '' ? parseInt(budget_min) : null,
      budget_max: budget_max && budget_max !== '' ? parseInt(budget_max) : null,
      preferred_location: preferred_location && preferred_location.trim() !== '' ? preferred_location : null,
      food_preference: food_preference || 'both',
      cleanliness_level: cleanliness_level || 'moderate',
      lifestyle: lifestyle || 'flexible',
      smoking_preference: smoking_preference || 'non_smoker'
    };

    // Create new student
    const student = await Student.create(cleanData);

    const token = generateToken(student.id, 'student', student.token_version || 0);
    const refreshToken = await createRefreshToken(student.id, 'student');

    res.status(201).json({
      message: 'Student registered successfully',
      token,
      refreshToken,
      user: {
        id: student.id,
        name: student.name,
        email: student.email,
        role: 'student'
      }
    });
  } catch (error) {
    console.error('Student registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Student Login
const loginStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find student
    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(student.id, 'student', student.token_version || 0);
    const refreshToken = await createRefreshToken(student.id, 'student');

    res.json({
      message: 'Login successful',
      token,
      refreshToken,
      user: {
        id: student.id,
        name: student.name,
        email: student.email,
        role: 'student'
      }
    });
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// PG Owner Registration
const registerOwner = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone, address } = req.body;

    // Check if owner already exists
    const existingOwner = await PgOwner.findOne({ where: { email } });
    if (existingOwner) {
      return res.status(400).json({ message: 'Owner already exists with this email' });
    }

    // Create new owner
    const owner = await PgOwner.create({
      name,
      email,
      password,
      phone,
      address
    });

    const token = generateToken(owner.id, 'owner', owner.token_version || 0);
    const refreshToken = await createRefreshToken(owner.id, 'owner');

    res.status(201).json({
      message: 'Owner registered successfully',
      token,
      refreshToken,
      user: {
        id: owner.id,
        name: owner.name,
        email: owner.email,
        role: 'owner'
      }
    });
  } catch (error) {
    console.error('Owner registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// PG Owner Login
const loginOwner = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find owner
    const owner = await PgOwner.findOne({ where: { email } });
    if (!owner) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await owner.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(owner.id, 'owner');

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: owner.id,
        name: owner.name,
        email: owner.email,
        role: 'owner'
      }
    });
  } catch (error) {
    console.error('Owner login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find admin
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin.id, 'admin', admin.token_version || 0);
    const refreshToken = await createRefreshToken(admin.id, 'admin');

    res.json({
      message: 'Admin login successful',
      token,
      refreshToken,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    res.json({
      user: req.user,
      role: req.userRole
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updateData = { ...req.body };
    
    // Remove sensitive fields
    delete updateData.password;
    delete updateData.id;
    delete updateData.created_at;
    delete updateData.updated_at;

    await req.user.update(updateData);

    if (req.userRole === 'student') {
      try {
        require('../utils/cache').delByPrefix(`recommendations:student:${req.user.id}`)
      } catch (e) {}
    }

    res.json({
      message: 'Profile updated successfully',
      user: req.user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error during profile update' });
  }
};

// Refresh access token
const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken || typeof refreshToken !== 'string') {
      return res.status(400).json({ message: 'Refresh token required' })
    }
    const rotated = await rotateRefreshToken(refreshToken)
    if (!rotated) {
      return res.status(401).json({ message: 'Invalid or expired refresh token' })
    }
    res.json({
      message: 'Token refreshed',
      token: rotated.accessToken,
      refreshToken: rotated.refreshToken
    })
  } catch (error) {
    console.error('Refresh token error:', error)
    res.status(500).json({ message: 'Server error during token refresh' })
  }
}

// Logout and revoke refresh token
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body
    if (refreshToken) {
      const hash = crypto.createHash('sha256').update(refreshToken).digest('hex')
      const existing = await RefreshToken.findOne({ where: { token_hash: hash, revoked: false } })
      if (existing) {
        existing.revoked = true
        await existing.save()
      }
    }
    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({ message: 'Server error during logout' })
  }
}

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email, role = 'student' } = req.body
    if (!email) return res.status(400).json({ message: 'Email is required' })
    let user = null
    if (role === 'student') user = await Student.findOne({ where: { email } })
    else if (role === 'owner') user = await PgOwner.findOne({ where: { email } })
    else if (role === 'admin') user = await Admin.findOne({ where: { email } })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const raw = crypto.randomBytes(32).toString('hex')
    const hash = crypto.createHash('sha256').update(raw).digest('hex')
    const expires = new Date(Date.now() + 60 * 60 * 1000)
    await PasswordResetToken.create({ user_id: user.id, user_role: role, token_hash: hash, expires_at: expires })

    res.json({ message: 'Password reset link generated', expiresAt: expires.toISOString() })
  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(500).json({ message: 'Server error during password reset request' })
  }
}

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body
    if (!token || !password) return res.status(400).json({ message: 'Token and new password are required' })
    const hash = crypto.createHash('sha256').update(token).digest('hex')
    const prt = await PasswordResetToken.findOne({ where: { token_hash: hash, used: false } })
    if (!prt || prt.expires_at < new Date()) return res.status(400).json({ message: 'Invalid or expired token' })

    let userModel = prt.user_role === 'student' ? Student : prt.user_role === 'owner' ? PgOwner : Admin
    const user = await userModel.findByPk(prt.user_id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.password = password
    user.token_version = (user.token_version || 0) + 1
    await user.save()

    prt.used = true
    await prt.save()

    res.json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({ message: 'Server error during password reset' })
  }
}
// Send/Resend verification
const resendVerification = async (req, res) => {
  try {
    const { email, role = 'student' } = req.body
    if (!email) return res.status(400).json({ message: 'Email is required' })
    const model = role === 'student' ? Student : PgOwner
    const user = await model.findOne({ where: { email } })
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (user.email_verified) return res.json({ message: 'Email already verified' })

    const raw = crypto.randomBytes(32).toString('hex')
    const hash = crypto.createHash('sha256').update(raw).digest('hex')
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    await EmailVerificationToken.create({ user_id: user.id, user_role: role, token_hash: hash, expires_at: expires })
    res.json({ message: 'Verification link generated', expiresAt: expires.toISOString() })
  } catch (error) {
    console.error('Resend verification error:', error)
    res.status(500).json({ message: 'Server error during verification' })
  }
}


// Verify email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query
    if (!token) return res.status(400).json({ message: 'Token is required' })
    const hash = crypto.createHash('sha256').update(token).digest('hex')
    const evt = await EmailVerificationToken.findOne({ where: { token_hash: hash, used: false } })
    if (!evt || evt.expires_at < new Date()) return res.status(400).json({ message: 'Invalid or expired token' })
    const model = evt.user_role === 'student' ? Student : PgOwner
    const user = await model.findByPk(evt.user_id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    user.email_verified = true
    await user.save()
    evt.used = true
    await evt.save()
    res.json({ message: 'Email verified successfully' })
  } catch (error) {
    console.error('Verify email error:', error)
    res.status(500).json({ message: 'Server error during email verification' })
  }
}

module.exports = {
  registerStudent,
  loginStudent,
  registerOwner,
  loginOwner,
  loginAdmin,
  getProfile,
  updateProfile,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  resendVerification,
  verifyEmail
};
