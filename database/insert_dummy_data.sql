USE roomnook_ai;

-- Insert Students (with hashed passwords)
-- Password 'password123' hashed with bcrypt
INSERT INTO students (name, email, password, phone, university, course, year_of_study, budget_min, budget_max, preferred_location, food_preference, cleanliness_level, lifestyle, smoking_preference) VALUES
('Rohan Kumar', 'rohan@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543210', 'Delhi University', 'Computer Science', 3, 5000, 8000, 'Central Delhi', 'veg', 'moderate', 'flexible', 'non_smoker'),
('Priya Sharma', 'priya@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543211', 'JNU', 'Literature', 2, 4000, 7000, 'South Delhi', 'veg', 'very_clean', 'early_bird', 'non_smoker'),
('Amit Singh', 'amit@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543212', 'DU', 'Economics', 4, 6000, 10000, 'North Delhi', 'both', 'casual', 'night_owl', 'okay_with_smoking'),
('Sneha Patel', 'sneha@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543213', 'JMI', 'Journalism', 1, 3500, 6000, 'East Delhi', 'veg', 'moderate', 'flexible', 'non_smoker'),
('Rahul Gupta', 'rahul@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543214', 'IP University', 'Engineering', 3, 7000, 12000, 'West Delhi', 'non-veg', 'very_clean', 'early_bird', 'non_smoker'),
('Kavya Reddy', 'kavya@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543215', 'DU', 'Psychology', 2, 4500, 7500, 'Central Delhi', 'veg', 'moderate', 'flexible', 'non_smoker'),
('Vikram Joshi', 'vikram@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543216', 'JNU', 'Political Science', 4, 5500, 9000, 'South Delhi', 'both', 'casual', 'night_owl', 'smoker'),
('Anita Desai', 'anita@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543217', 'DU', 'History', 1, 4000, 6500, 'North Delhi', 'veg', 'very_clean', 'early_bird', 'non_smoker'),
('Rajesh Verma', 'rajesh@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543218', 'IP University', 'MBA', 2, 8000, 15000, 'Central Delhi', 'both', 'moderate', 'flexible', 'non_smoker'),
('Sunita Iyer', 'sunita@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543219', 'JMI', 'English', 3, 5000, 8000, 'East Delhi', 'veg', 'moderate', 'early_bird', 'non_smoker');

-- Insert PG Owners
INSERT INTO pg_owners (name, email, password, phone, address, verification_status) VALUES
('Rajesh Kumar', 'rajesh@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543220', '123 Karol Bagh, New Delhi', 'verified'),
('Sunita Devi', 'sunita@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543221', '456 Lajpat Nagar, New Delhi', 'verified'),
('Manoj Sharma', 'manoj@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543222', '789 Greater Kailash, New Delhi', 'verified'),
('Kavita Singh', 'kavita@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543223', '321 Hauz Khas, New Delhi', 'verified'),
('Vikram Patel', 'vikram@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543224', '654 Malviya Nagar, New Delhi', 'verified'),
('Anita Gupta', 'anita@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543225', '987 Connaught Place, New Delhi', 'verified');

-- Insert Admin
INSERT INTO admins (name, email, password, role) VALUES
('Admin User', 'admin@roomnook.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', 'super_admin');

-- Insert PG Listings
INSERT INTO pg_listings (owner_id, title, description, address, city, state, pincode, rent_amount, deposit_amount, room_type, available_from, amenities, images, contact_phone, contact_email, verification_status) VALUES
(1, 'Cozy Single Room in Karol Bagh', 'Furnished single room with attached bathroom in a safe PG for students.', '123 Karol Bagh, New Delhi', 'New Delhi', 'Delhi', '110005', 6500, 13000, 'single', '2024-01-15', '["WiFi", "AC", "Laundry", "Security", "Parking"]', '["room1.jpg", "bathroom1.jpg"]', '+91-9876543220', 'rajesh@email.com', 'verified'),
(2, 'Double Sharing Room Near Metro', 'Spacious double sharing room with modern amenities and metro connectivity.', '456 Lajpat Nagar, New Delhi', 'New Delhi', 'Delhi', '110024', 4500, 9000, 'double', '2024-01-20', '["WiFi", "Geyser", "Laundry", "Security", "Parking", "CCTV"]', '["room2.jpg", "common2.jpg"]', '+91-9876543221', 'sunita@email.com', 'verified'),
(3, 'Triple Sharing with Study Area', 'Large triple sharing room with dedicated study area and 24/7 power backup.', '789 Greater Kailash, New Delhi', 'New Delhi', 'Delhi', '110048', 3500, 7000, 'triple', '2024-02-01', '["WiFi", "Study Area", "Power Backup", "Laundry", "Security"]', '["room3.jpg", "study3.jpg"]', '+91-9876543222', 'manoj@email.com', 'verified'),
(4, 'Premium Single with Balcony', 'Luxury single room with private balcony and premium amenities.', '321 Hauz Khas, New Delhi', 'New Delhi', 'Delhi', '110016', 8500, 17000, 'single', '2024-01-25', '["WiFi", "AC", "Balcony", "Laundry", "Security", "Parking", "CCTV"]', '["room4.jpg", "balcony4.jpg"]', '+91-9876543223', 'kavita@email.com', 'verified'),
(5, 'Shared Room with Kitchen Access', 'Comfortable shared room with access to common kitchen facilities.', '654 Malviya Nagar, New Delhi', 'New Delhi', 'Delhi', '110017', 4000, 8000, 'shared', '2024-02-05', '["WiFi", "Kitchen", "Geyser", "Laundry", "Security"]', '["room5.jpg", "kitchen5.jpg"]', '+91-9876543224', 'vikram@email.com', 'verified'),
(6, 'Central Location PG', 'Well-maintained PG in central location with all modern facilities.', '987 Connaught Place, New Delhi', 'New Delhi', 'Delhi', '110001', 7000, 14000, 'single', '2024-01-30', '["WiFi", "AC", "Laundry", "Security", "Parking", "CCTV", "Gym"]', '["room6.jpg", "gym6.jpg"]', '+91-9876543225', 'anita@email.com', 'verified');

-- Insert Roommate Profiles
INSERT INTO roommate_profile (student_id, bio, interests, study_habits, social_preference, noise_tolerance, guest_policy, sharing_preferences, is_active) VALUES
(1, 'Computer science student who loves coding and technology. Looking for a clean and quiet environment to study.', '["Programming", "Gaming", "Music"]', 'Night studies', 'Balanced', 'Low', 'Occasional guests allowed', '["Clean space", "Quiet environment", "Tech-friendly"]', TRUE),
(2, 'Literature student passionate about books and writing. Prefer early morning routines and quiet study time.', '["Reading", "Writing", "Poetry"]', 'Early morning', 'Quiet', 'Very low', 'No overnight guests', '["Clean space", "Quiet environment", "Books-friendly"]', TRUE),
(3, 'Economics student who enjoys socializing and group studies. Flexible with schedules and noise levels.', '["Economics", "Politics", "Sports"]', 'Flexible', 'Social', 'High', 'Guests welcome', '["Social environment", "Group studies", "Sports activities"]', TRUE),
(4, 'Journalism student who loves meeting new people and staying updated with current affairs.', '["News", "Writing", "Photography"]', 'Evening studies', 'Social', 'Moderate', 'Occasional guests', '["Social environment", "News updates", "Creative space"]', TRUE),
(5, 'Engineering student focused on academics and career development. Prefer organized and disciplined environment.', '["Engineering", "Technology", "Innovation"]', 'Regular schedule', 'Balanced', 'Low', 'Study group only', '["Clean space", "Tech-friendly", "Academic focus"]', TRUE);

-- Insert Mess Listings
INSERT INTO mess_listings (name, description, address, city, state, pincode, contact_phone, contact_email, meal_plans, pricing, food_types, service_hours, delivery_available, rating, total_reviews, images, status) VALUES
('Sharma Mess', 'Homely North Indian food with fresh ingredients and hygienic preparation.', '123 Karol Bagh, New Delhi', 'New Delhi', 'Delhi', '110005', '+91-9876543230', 'sharma.mess@email.com', '["Breakfast", "Lunch", "Dinner"]', '{"breakfast": 80, "lunch": 120, "dinner": 120}', 'veg', '{"breakfast": "7:00-10:00", "lunch": "12:00-15:00", "dinner": "19:00-22:00"}', TRUE, 4.2, 45, '["mess1.jpg", "food1.jpg"]', 'active'),
('Patel Kitchen', 'Gujarati and South Indian cuisine with authentic flavors and healthy options.', '456 Lajpat Nagar, New Delhi', 'New Delhi', 'Delhi', '110024', '+91-9876543231', 'patel.kitchen@email.com', '["Breakfast", "Lunch", "Dinner"]', '{"breakfast": 75, "lunch": 110, "dinner": 110}', 'veg', '{"breakfast": "7:30-10:30", "lunch": "12:30-15:30", "dinner": "19:30-22:30"}', TRUE, 4.0, 38, '["mess2.jpg", "food2.jpg"]', 'active'),
('Singh Dhaba', 'Punjabi food with rich flavors and generous portions. Non-vegetarian options available.', '789 Greater Kailash, New Delhi', 'New Delhi', 'Delhi', '110048', '+91-9876543232', 'singh.dhaba@email.com', '["Breakfast", "Lunch", "Dinner"]', '{"breakfast": 90, "lunch": 140, "dinner": 140}', 'both', '{"breakfast": "7:00-10:00", "lunch": "12:00-15:00", "dinner": "19:00-22:00"}', FALSE, 4.5, 52, '["mess3.jpg", "food3.jpg"]', 'active'),
('Reddy Canteen', 'South Indian specials with fresh dosas, idlis, and traditional meals.', '321 Hauz Khas, New Delhi', 'New Delhi', 'Delhi', '110016', '+91-9876543233', 'reddy.canteen@email.com', '["Breakfast", "Lunch", "Dinner"]', '{"breakfast": 85, "lunch": 130, "dinner": 130}', 'veg', '{"breakfast": "7:00-10:00", "lunch": "12:00-15:00", "dinner": "19:00-22:00"}', TRUE, 4.3, 41, '["mess4.jpg", "food4.jpg"]', 'active'),
('Joshi Mess', 'Maharashtrian cuisine with authentic flavors and home-style cooking.', '654 Malviya Nagar, New Delhi', 'New Delhi', 'Delhi', '110017', '+91-9876543234', 'joshi.mess@email.com', '["Breakfast", "Lunch", "Dinner"]', '{"breakfast": 80, "lunch": 125, "dinner": 125}', 'veg', '{"breakfast": "7:30-10:30", "lunch": "12:30-15:30", "dinner": "19:30-22:30"}', TRUE, 4.1, 35, '["mess5.jpg", "food5.jpg"]', 'active'),
('Desai Kitchen', 'Multi-cuisine mess offering variety of Indian dishes with modern presentation.', '987 Connaught Place, New Delhi', 'New Delhi', 'Delhi', '110001', '+91-9876543235', 'desai.kitchen@email.com', '["Breakfast", "Lunch", "Dinner"]', '{"breakfast": 95, "lunch": 150, "dinner": 150}', 'both', '{"breakfast": "7:00-10:00", "lunch": "12:00-15:00", "dinner": "19:00-22:00"}', TRUE, 4.4, 48, '["mess6.jpg", "food6.jpg"]', 'active'),
('Verma Mess', 'Traditional North Indian food with focus on hygiene and taste.', '111 Rajouri Garden, New Delhi', 'New Delhi', 'Delhi', '110027', '+91-9876543236', 'verma.mess@email.com', '["Breakfast", "Lunch", "Dinner"]', '{"breakfast": 85, "lunch": 135, "dinner": 135}', 'veg', '{"breakfast": "7:00-10:00", "lunch": "12:00-15:00", "dinner": "19:00-22:00"}', FALSE, 4.0, 29, '["mess7.jpg", "food7.jpg"]', 'active'),
('Iyer Canteen', 'Tamil and Kerala cuisine with authentic South Indian flavors.', '222 Janakpuri, New Delhi', 'New Delhi', 'Delhi', '110058', '+91-9876543237', 'iyer.canteen@email.com', '["Breakfast", "Lunch", "Dinner"]', '{"breakfast": 80, "lunch": 120, "dinner": 120}', 'veg', '{"breakfast": "7:00-10:00", "lunch": "12:00-15:00", "dinner": "19:00-22:00"}', TRUE, 4.2, 33, '["mess8.jpg", "food8.jpg"]', 'active');

-- Insert Reviews
INSERT INTO reviews (student_id, pg_listing_id, rating, comment, review_type) VALUES
(1, 1, 5, 'Excellent PG with clean rooms and good amenities. Highly recommended!', 'pg'),
(2, 2, 4, 'Good location and facilities. Roommates are friendly and respectful.', 'pg'),
(3, 3, 4, 'Great value for money. Study area is very helpful for students.', 'pg'),
(4, 4, 5, 'Premium facilities and excellent service. Worth the extra cost.', 'pg'),
(5, 5, 3, 'Decent PG but could improve on cleanliness standards.', 'pg'),
(6, 6, 4, 'Good amenities and security. Central location is very convenient.', 'pg');

INSERT INTO reviews (student_id, mess_listing_id, rating, comment, review_type) VALUES
(1, 1, 4, 'Good quality food with reasonable prices. Delivery service is reliable.', 'mess'),
(2, 2, 5, 'Excellent South Indian food. Fresh and authentic flavors.', 'mess'),
(3, 3, 4, 'Great Punjabi food with generous portions. Non-veg options are good.', 'mess'),
(4, 4, 4, 'Good variety of South Indian dishes. Service is prompt.', 'mess'),
(5, 5, 3, 'Decent food quality but could improve on spice levels.', 'mess'),
(6, 6, 5, 'Excellent multi-cuisine options. Modern presentation and good taste.', 'mess');

-- Insert Bookmarks
INSERT INTO bookmarks (student_id, pg_listing_id, bookmark_type) VALUES
(1, 1, 'pg'),
(1, 4, 'pg'),
(2, 2, 'pg'),
(3, 3, 'pg'),
(4, 4, 'pg'),
(5, 5, 'pg'),
(6, 6, 'pg');

INSERT INTO bookmarks (student_id, mess_listing_id, bookmark_type) VALUES
(1, 1, 'mess'),
(1, 4, 'mess'),
(2, 2, 'mess'),
(3, 3, 'mess'),
(4, 4, 'mess'),
(5, 6, 'mess');

-- Insert PG Applications
INSERT INTO pg_applications (student_id, pg_listing_id, status, message) VALUES
(1, 1, 'approved', 'Interested in the single room. Please let me know about the availability.'),
(2, 2, 'pending', 'Looking for a double sharing room. Would like to visit before finalizing.'),
(3, 3, 'approved', 'Perfect for my budget and requirements. Ready to move in.'),
(4, 4, 'pending', 'Interested in the premium single room. Please share more details.'),
(5, 5, 'rejected', 'Room requirements do not match my preferences.'),
(6, 6, 'approved', 'Central location works well for me. Ready to proceed.');

SELECT 'Dummy data inserted successfully!' as Status;
