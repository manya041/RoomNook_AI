const express = require('express');
const cors = require('cors');
const { sequelize, testConnection } = require('./config/db');
const { syncDatabase } = require('./models');

const { env } = require('./config/config');
const requestId = require('./middleware/requestId');
const errorHandler = require('./middleware/errorHandler');
const securityHeaders = require('./middleware/securityHeaders');
const metricsMiddleware = require('./middleware/metricsMiddleware');
const { metricsText } = require('./utils/metrics');

// Import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = env.port;

// Middleware
app.use(cors({ origin: env.cors.allowedOrigins, credentials: true }));
app.use(requestId);
app.use(securityHeaders);
app.use(metricsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Test database connection and sync models
testConnection();
syncDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/owners', ownerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'RoomNook AI Backend is running!',
    timestamp: new Date().toISOString()
  });
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain')
  res.send(metricsText())
})

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 RoomNook AI Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
