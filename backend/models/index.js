const { sequelize } = require('../config/db');

// Import all models
const Student = require('./Student');
const PgOwner = require('./PgOwner');
const Admin = require('./Admin');
const PgListing = require('./PgListing');
const RoommateProfile = require('./RoommateProfile');
const MessListing = require('./MessListing');
const Review = require('./Review');
const Bookmark = require('./Bookmark');
const PgApplication = require('./PgApplication');

// Define associations

// Student associations
Student.hasOne(RoommateProfile, { foreignKey: 'student_id', as: 'roommateProfile' });
Student.hasMany(Review, { foreignKey: 'student_id', as: 'reviews' });
Student.hasMany(Bookmark, { foreignKey: 'student_id', as: 'bookmarks' });
Student.hasMany(PgApplication, { foreignKey: 'student_id', as: 'applications' });

// PG Owner associations
PgOwner.hasMany(PgListing, { foreignKey: 'owner_id', as: 'pgListings' });

// PG Listing associations
PgListing.belongsTo(PgOwner, { foreignKey: 'owner_id', as: 'owner' });
PgListing.hasMany(Review, { foreignKey: 'pg_listing_id', as: 'reviews' });
PgListing.hasMany(Bookmark, { foreignKey: 'pg_listing_id', as: 'bookmarks' });
PgListing.hasMany(PgApplication, { foreignKey: 'pg_listing_id', as: 'applications' });

// Roommate Profile associations
RoommateProfile.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });

// Mess Listing associations
MessListing.hasMany(Review, { foreignKey: 'mess_listing_id', as: 'reviews' });
MessListing.hasMany(Bookmark, { foreignKey: 'mess_listing_id', as: 'bookmarks' });

// Review associations
Review.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });
Review.belongsTo(PgListing, { foreignKey: 'pg_listing_id', as: 'pgListing' });
Review.belongsTo(MessListing, { foreignKey: 'mess_listing_id', as: 'messListing' });

// Bookmark associations
Bookmark.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });
Bookmark.belongsTo(PgListing, { foreignKey: 'pg_listing_id', as: 'pgListing' });
Bookmark.belongsTo(MessListing, { foreignKey: 'mess_listing_id', as: 'messListing' });

// PG Application associations
PgApplication.belongsTo(Student, { foreignKey: 'student_id', as: 'student' });
PgApplication.belongsTo(PgListing, { foreignKey: 'pg_listing_id', as: 'pgListing' });

// Sync database
const syncDatabase = async () => {
  try {
    // Test connection first
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    await sequelize.sync({ force: false, alter: false });
    console.log('✅ Database synchronized successfully');
  } catch (error) {
    console.error('❌ Database synchronization failed:', error);
    // Continue running even if sync fails
    console.log('⚠️ Continuing without database sync...');
  }
};

module.exports = {
  sequelize,
  Student,
  PgOwner,
  Admin,
  PgListing,
  RoommateProfile,
  MessListing,
  Review,
  Bookmark,
  PgApplication,
  syncDatabase
};
