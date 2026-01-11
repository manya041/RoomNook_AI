const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const RoommateProfile = sequelize.define('RoommateProfile', {
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
  bio: {
    type: DataTypes.TEXT
  },
  interests: {
    type: DataTypes.JSON
  },
  study_schedule: {
    type: DataTypes.STRING(100)
  },
  social_level: {
    type: DataTypes.ENUM('introvert', 'extrovert', 'ambivert'),
    defaultValue: 'ambivert'
  },
  party_frequency: {
    type: DataTypes.ENUM('never', 'rarely', 'sometimes', 'often'),
    defaultValue: 'sometimes'
  },
  guest_policy: {
    type: DataTypes.ENUM('strict', 'moderate', 'flexible'),
    defaultValue: 'moderate'
  },
  is_looking_for_roommate: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'roommate_profile',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = RoommateProfile;
