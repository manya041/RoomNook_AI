const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const PasswordResetToken = sequelize.define('PasswordResetToken', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  user_role: { type: DataTypes.ENUM('student', 'owner', 'admin'), allowNull: false },
  token_hash: { type: DataTypes.STRING(128), allowNull: false, unique: true },
  expires_at: { type: DataTypes.DATE, allowNull: false },
  used: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: 'password_reset_tokens',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

module.exports = PasswordResetToken