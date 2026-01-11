const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PgListing = sequelize.define('PgListing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pg_owners',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  rent_amount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deposit_amount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  room_type: {
    type: DataTypes.ENUM('single', 'double', 'triple', 'quad'),
    allowNull: false
  },
  gender_preference: {
    type: DataTypes.ENUM('male', 'female', 'any'),
    defaultValue: 'any'
  },
  available_from: {
    type: DataTypes.DATEONLY
  },
  images: {
    type: DataTypes.JSON
  },
  amenities: {
    type: DataTypes.JSON
  },
  rules: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'booked'),
    defaultValue: 'active'
  },
  verification_status: {
    type: DataTypes.ENUM('pending', 'verified', 'rejected'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'pg_listings',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = PgListing;
