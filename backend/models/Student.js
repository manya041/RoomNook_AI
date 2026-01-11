const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcrypt');

const Student = sequelize.define('Student', {
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
  university: {
    type: DataTypes.STRING(100)
  },
  course: {
    type: DataTypes.STRING(100)
  },
  year_of_study: {
    type: DataTypes.INTEGER
  },
  budget_min: {
    type: DataTypes.INTEGER,
    defaultValue: 3000
  },
  budget_max: {
    type: DataTypes.INTEGER,
    defaultValue: 10000
  },
  preferred_location: {
    type: DataTypes.STRING(100)
  },
  food_preference: {
    type: DataTypes.ENUM('veg', 'non-veg', 'both'),
    defaultValue: 'both'
  },
  cleanliness_level: {
    type: DataTypes.ENUM('very_clean', 'moderate', 'casual'),
    defaultValue: 'moderate'
  },
  lifestyle: {
    type: DataTypes.ENUM('early_bird', 'night_owl', 'flexible'),
    defaultValue: 'flexible'
  },
  smoking_preference: {
    type: DataTypes.ENUM('non_smoker', 'smoker', 'okay_with_smoking'),
    defaultValue: 'non_smoker'
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
  tableName: 'students',
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: async (student) => {
      if (student.password) {
        student.password = await bcrypt.hash(student.password, 10);
      }
    },
    beforeUpdate: async (student) => {
      if (student.changed('password')) {
        student.password = await bcrypt.hash(student.password, 10);
      }
    }
  }
});

// Instance methods
Student.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

Student.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = Student;
