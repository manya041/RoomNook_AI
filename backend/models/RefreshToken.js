const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const RefreshToken = sequelize.define('RefreshToken', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  user_role: { type: DataTypes.ENUM('student', 'owner', 'admin'), allowNull: false },
  token_hash: { type: DataTypes.STRING(128), allowNull: false, unique: true },
  expires_at: { type: DataTypes.DATE, allowNull: false },
  revoked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, {
  tableName: 'refresh_tokens',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

module.exports = RefreshToken