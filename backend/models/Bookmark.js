const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Bookmark = sequelize.define('Bookmark', {
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
  bookmark_type: {
    type: DataTypes.ENUM('pg', 'mess'),
    allowNull: false
  }
}, {
  tableName: 'bookmarks',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Bookmark;
