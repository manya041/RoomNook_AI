const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcrypt');

const PgOwner = sequelize.define('PgOwner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(15)
  },
  address: {
    type: DataTypes.TEXT
  },
  verification_status: {
    type: DataTypes.ENUM('pending', 'verified', 'rejected'),
    defaultValue: 'pending'
  },
  email_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_blocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  token_version: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'pg_owners',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: async (owner) => {
      if (owner.password) {
        owner.password = await bcrypt.hash(owner.password, 10);
      }
    },
    beforeUpdate: async (owner) => {
      if (owner.changed('password')) {
        owner.password = await bcrypt.hash(owner.password, 10);
      }
    }
  }
});

// Instance methods
PgOwner.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

PgOwner.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = PgOwner;
