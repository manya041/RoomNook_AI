-- Drop and recreate the entire database
DROP DATABASE IF EXISTS roomnook_ai;
CREATE DATABASE roomnook_ai;
USE roomnook_ai;

-- Students table
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    university VARCHAR(100),
    course VARCHAR(100),
    year_of_study INT,
    budget_min DECIMAL(10,2),
    budget_max DECIMAL(10,2),
    preferred_location VARCHAR(100),
    food_preference ENUM('veg', 'non-veg', 'both') DEFAULT 'both',
    cleanliness_level ENUM('very_clean', 'moderate', 'casual') DEFAULT 'moderate',
    lifestyle ENUM('early_bird', 'night_owl', 'flexible') DEFAULT 'flexible',
    smoking_preference ENUM('non_smoker', 'smoker', 'okay_with_smoking') DEFAULT 'non_smoker',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- PG Owners table
CREATE TABLE pg_owners (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admins table
CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- PG Listings table
CREATE TABLE pg_listings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    rent_amount DECIMAL(10,2) NOT NULL,
    deposit_amount DECIMAL(10,2),
    room_type ENUM('single', 'double', 'triple', 'shared') NOT NULL,
    available_from DATE,
    amenities JSON,
    images JSON,
    contact_phone VARCHAR(15),
    contact_email VARCHAR(100),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES pg_owners(id) ON DELETE CASCADE
);

-- Roommate Profile table
CREATE TABLE roommate_profile (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    bio TEXT,
    interests JSON,
    study_habits VARCHAR(50),
    social_preference VARCHAR(50),
    noise_tolerance VARCHAR(50),
    guest_policy VARCHAR(50),
    sharing_preferences JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Mess Listings table
CREATE TABLE mess_listings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    contact_phone VARCHAR(15),
    contact_email VARCHAR(100),
    meal_plans JSON,
    pricing JSON,
    food_types ENUM('veg', 'non-veg', 'both') DEFAULT 'both',
    service_hours JSON,
    delivery_available BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    images JSON,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    pg_listing_id INT,
    mess_listing_id INT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_type ENUM('pg', 'mess') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (pg_listing_id) REFERENCES pg_listings(id) ON DELETE CASCADE,
    FOREIGN KEY (mess_listing_id) REFERENCES mess_listings(id) ON DELETE CASCADE
);

-- Bookmarks table
CREATE TABLE bookmarks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    pg_listing_id INT,
    mess_listing_id INT,
    bookmark_type ENUM('pg', 'mess') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (pg_listing_id) REFERENCES pg_listings(id) ON DELETE CASCADE,
    FOREIGN KEY (mess_listing_id) REFERENCES mess_listings(id) ON DELETE CASCADE
);

-- PG Applications table
CREATE TABLE pg_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    pg_listing_id INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (pg_listing_id) REFERENCES pg_listings(id) ON DELETE CASCADE
);

SELECT 'Database recreated successfully!' as Status;
