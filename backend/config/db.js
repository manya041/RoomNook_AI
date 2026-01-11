const { Sequelize } = require('sequelize');
const { env } = require('./config');

const sequelize = new Sequelize(
  env.db.name,
  env.db.user,
  env.db.pass,
  {
    host: env.db.host,
    port: env.db.port,
    dialect: 'mysql',
    logging: env.nodeEnv === 'development' ? console.log : false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
  }
);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, testConnection };
