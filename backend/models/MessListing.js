const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MessListing = sequelize.define('MessListing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
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
  monthly_cost: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  food_type: {
    type: DataTypes.ENUM('veg', 'non-veg', 'both'),
    allowNull: false
  },
  meal_timing: {
    type: DataTypes.STRING(100)
  },
  contact_number: {
    type: DataTypes.STRING(15)
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.00
  },
  images: {
    type: DataTypes.JSON
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  tableName: 'mess_listings',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = MessListing;
