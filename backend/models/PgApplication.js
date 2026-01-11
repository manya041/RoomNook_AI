const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PgApplication = sequelize.define('PgApplication', {
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
    allowNull: false,
    references: {
      model: 'pg_listings',
      key: 'id'
    }
  },
  application_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'withdrawn'),
    defaultValue: 'pending'
  },
  message: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'pg_applications',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = PgApplication;
