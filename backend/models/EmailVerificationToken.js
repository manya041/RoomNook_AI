const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/db')

const EmailVerificationToken = sequelize.define('EmailVerificationToken', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  user_role: { type: DataTypes.ENUM('student', 'owner'), allowNull: false },
  token_hash: { type: DataTypes.STRING(128), allowNull: false, unique: true },
  expires_at: { type: DataTypes.DATE, allowNull: false },
  used: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: 'email_verification_tokens',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

module.exports = EmailVerificationToken