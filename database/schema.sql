-- RoomNook AI Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS roomnook_ai;
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
    budget_min INT DEFAULT 3000,
    budget_max INT DEFAULT 10000,
    preferred_location VARCHAR(100),
    food_preference ENUM('veg', 'non-veg', 'both') DEFAULT 'both',
    cleanliness_level ENUM('very_clean', 'moderate', 'casual') DEFAULT 'moderate',
    lifestyle ENUM('early_bird', 'night_owl', 'flexible') DEFAULT 'flexible',
    smoking_preference ENUM('non_smoker', 'smoker', 'okay_with_smoking') DEFAULT 'non_smoker',
    is_blocked TINYINT(1) DEFAULT 0,
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
    is_blocked TINYINT(1) DEFAULT 0,
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
    location VARCHAR(100) NOT NULL,
    rent_amount INT NOT NULL,
    deposit_amount INT DEFAULT 0,
    room_type ENUM('single', 'double', 'triple', 'quad') NOT NULL,
    gender_preference ENUM('male', 'female', 'any') DEFAULT 'any',
    available_from DATE,
    images JSON,
    amenities JSON,
    rules TEXT,
    status ENUM('active', 'inactive', 'booked') DEFAULT 'active',
    verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES pg_owners(id) ON DELETE CASCADE
);

-- Roommate Profiles table
CREATE TABLE roommate_profile (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    bio TEXT,
    interests JSON,
    study_schedule VARCHAR(100),
    social_level ENUM('introvert', 'extrovert', 'ambivert') DEFAULT 'ambivert',
    party_frequency ENUM('never', 'rarely', 'sometimes', 'often') DEFAULT 'sometimes',
    guest_policy ENUM('strict', 'moderate', 'flexible') DEFAULT 'moderate',
    is_looking_for_roommate BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- PG Applications table
CREATE TABLE pg_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    pg_listing_id INT NOT NULL,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'accepted', 'rejected', 'withdrawn') DEFAULT 'pending',
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (pg_listing_id) REFERENCES pg_listings(id) ON DELETE CASCADE
);

-- Mess Listings table
CREATE TABLE mess_listings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    location VARCHAR(100) NOT NULL,
    monthly_cost INT NOT NULL,
    food_type ENUM('veg', 'non-veg', 'both') NOT NULL,
    meal_timing VARCHAR(100),
    contact_number VARCHAR(15),
    rating DECIMAL(3,2) DEFAULT 0.00,
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
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (pg_listing_id) REFERENCES pg_listings(id) ON DELETE CASCADE,
    FOREIGN KEY (mess_listing_id) REFERENCES mess_listings(id) ON DELETE CASCADE
);


-- Create indexes for better performance
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_pg_owners_email ON pg_owners(email);
CREATE INDEX idx_pg_listings_location ON pg_listings(location);
CREATE INDEX idx_pg_listings_rent ON pg_listings(rent_amount);
CREATE INDEX idx_pg_listings_status ON pg_listings(status);
CREATE INDEX idx_mess_listings_location ON mess_listings(location);
CREATE INDEX idx_reviews_pg_listing ON reviews(pg_listing_id);
CREATE INDEX idx_reviews_mess_listing ON reviews(mess_listing_id);
