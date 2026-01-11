const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'students',
      key: 'id'
    }
  },
  pg_listing_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'pg_listings',
      key: 'id'
    }
  },
  mess_listing_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'mess_listings',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT
  },
  review_type: {
    type: DataTypes.ENUM('pg', 'mess'),
    allowNull: false
  }
}, {
  tableName: 'reviews',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Review;
