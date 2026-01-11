USE roomnook_ai;

-- Students (password hash for "password123")
INSERT INTO students (name, email, password, phone, university, course, year_of_study, budget_min, budget_max, preferred_location, food_preference, cleanliness_level, lifestyle, smoking_preference)
VALUES
('Rohan Kumar', 'rohan@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543210', 'Delhi University', 'Computer Science', 3, 5000, 8000, 'Central Delhi', 'veg', 'moderate', 'flexible', 'non_smoker'),
('Priya Sharma', 'priya@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543211', 'JNU', 'Literature', 2, 4000, 7000, 'South Delhi', 'veg', 'very_clean', 'early_bird', 'non_smoker'),
('Amit Singh', 'amit@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543212', 'DU', 'Economics', 4, 6000, 10000, 'North Delhi', 'both', 'casual', 'night_owl', 'okay_with_smoking'),
('Sneha Patel', 'sneha@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543213', 'JMI', 'Journalism', 1, 3500, 6000, 'East Delhi', 'veg', 'moderate', 'flexible', 'non_smoker'),
('Rahul Gupta', 'rahul@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543214', 'IP University', 'Engineering', 3, 7000, 12000, 'West Delhi', 'non-veg', 'very_clean', 'early_bird', 'non_smoker'),
('Kavya Reddy', 'kavya@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543215', 'DU', 'Psychology', 2, 4500, 7500, 'Central Delhi', 'veg', 'moderate', 'flexible', 'non_smoker');

-- PG Owners
INSERT INTO pg_owners (name, email, password, phone, address, verification_status)
VALUES
('Rajesh Kumar', 'rajesh@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543220', '123 Karol Bagh, New Delhi', 'verified'),
('Sunita Devi', 'sunita@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543221', '456 Lajpat Nagar, New Delhi', 'verified'),
('Manoj Sharma', 'manoj@email.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', '+91-9876543222', '789 Greater Kailash, New Delhi', 'verified');

-- Admin
INSERT INTO admins (name, email, password, role)
VALUES ('Admin User', 'admin@roomnook.com', '$2b$10$5aK9AHIAsFFRg34ZprpZoOXLtsxFvIywkXI9kgngDPCCnKCHkZbO6', 'super_admin');

-- PG Listings
INSERT INTO pg_listings (owner_id, title, description, address, location, rent_amount, deposit_amount, room_type, gender_preference, available_from, amenities, images, rules, status, verification_status)
VALUES
(1, 'Cozy Single Room in Karol Bagh', 'Furnished single room with attached bathroom in a safe PG for students.', '123 Karol Bagh, New Delhi', 'Karol Bagh', 6500, 13000, 'single', 'any', '2024-01-15', '["WiFi", "AC", "Laundry", "Security", "Parking"]', '["room1.jpg", "bathroom1.jpg"]', 'No smoking; Maintain cleanliness', 'active', 'verified'),
(1, 'Double Sharing Room Near Metro', 'Spacious double sharing room with modern amenities and metro connectivity.', '456 Lajpat Nagar, New Delhi', 'Lajpat Nagar', 4500, 9000, 'double', 'any', '2024-01-20', '["WiFi", "Geyser", "Laundry", "Security", "Parking", "CCTV"]', '["room2.jpg", "common2.jpg"]', 'No loud music after 10 PM', 'active', 'verified'),
(2, 'Triple Sharing with Study Area', 'Large triple sharing room with dedicated study area and 24/7 power backup.', '789 Greater Kailash, New Delhi', 'Greater Kailash', 3500, 7000, 'triple', 'any', '2024-02-01', '["WiFi", "Study Area", "Power Backup", "Laundry", "Security"]', '["room3.jpg", "study3.jpg"]', 'Guests allowed in common areas only', 'active', 'verified'),
(2, 'Premium Single with Balcony', 'Luxury single room with private balcony and premium amenities.', '321 Hauz Khas, New Delhi', 'Hauz Khas', 8500, 17000, 'single', 'any', '2024-01-25', '["WiFi", "AC", "Balcony", "Laundry", "Security", "Parking", "CCTV"]', '["room4.jpg", "balcony4.jpg"]', 'Security deposit equivalent to 2 months rent', 'active', 'verified'),
(3, 'Central Location PG', 'Well-maintained PG in central location with all modern facilities.', '987 Connaught Place, New Delhi', 'Connaught Place', 7000, 14000, 'single', 'any', '2024-01-30', '["WiFi", "AC", "Laundry", "Security", "Parking", "CCTV", "Gym"]', '["room6.jpg", "gym6.jpg"]', 'Rent due before 5th of every month', 'active', 'verified');

-- Roommate Profiles
INSERT INTO roommate_profile (student_id, bio, interests, study_schedule, social_level, party_frequency, guest_policy, is_looking_for_roommate)
VALUES
(1, 'Computer science student who loves coding and technology. Looking for a clean and quiet environment to study.', '["Programming", "Gaming", "Music"]', 'Night studies', 'ambivert', 'rarely', 'moderate', TRUE),
(2, 'Literature student passionate about books and writing. Prefer early morning routines and quiet study time.', '["Reading", "Writing", "Poetry"]', 'Early morning', 'introvert', 'never', 'strict', TRUE),
(3, 'Economics student who enjoys socializing and group studies. Flexible with schedules and noise levels.', '["Economics", "Politics", "Sports"]', 'Flexible', 'extrovert', 'often', 'flexible', TRUE),
(4, 'Journalism student who loves meeting new people and staying updated with current affairs.', '["News", "Writing", "Photography"]', 'Evening studies', 'extrovert', 'sometimes', 'flexible', TRUE);

-- Mess Listings
INSERT INTO mess_listings (name, description, address, location, monthly_cost, food_type, meal_timing, contact_number, rating, images, status)
VALUES
('Sharma Mess', 'Homely North Indian food with fresh ingredients and hygienic preparation.', '123 Karol Bagh, New Delhi', 'Karol Bagh', 2500, 'veg', 'Breakfast 7-10AM, Lunch 12-3PM, Dinner 7-9PM', '+91-9876543230', 4.2, '["mess1.jpg", "food1.jpg"]', 'active'),
('Patel Kitchen', 'Gujarati and South Indian cuisine with authentic flavors and healthy options.', '456 Lajpat Nagar, New Delhi', 'Lajpat Nagar', 3000, 'veg', 'Breakfast 7:30-10:30AM, Lunch 12:30-3:30PM, Dinner 7:30-10:30PM', '+91-9876543231', 4.0, '["mess2.jpg", "food2.jpg"]', 'active'),
('Singh Dhaba', 'Punjabi food with rich flavors and generous portions. Non-vegetarian options available.', '789 Greater Kailash, New Delhi', 'Greater Kailash', 3200, 'both', 'Breakfast 7-10AM, Lunch 12-3PM, Dinner 7-10PM', '+91-9876543232', 4.5, '["mess3.jpg", "food3.jpg"]', 'active'),
('Desai Kitchen', 'Multi-cuisine mess offering variety of Indian dishes with modern presentation.', '987 Connaught Place, New Delhi', 'Connaught Place', 3100, 'both', 'Breakfast 7-10AM, Lunch 12-3PM, Dinner 7-9PM', '+91-9876543235', 4.4, '["mess6.jpg", "food6.jpg"]', 'active');

-- Reviews
INSERT INTO reviews (student_id, pg_listing_id, rating, comment, review_type)
VALUES
(1, 1, 5, 'Excellent PG with clean rooms and good amenities. Highly recommended!', 'pg'),
(2, 2, 4, 'Good location and facilities. Roommates are friendly and respectful.', 'pg'),
(3, 3, 4, 'Great value for money. Study area is very helpful for students.', 'pg'),
(4, 4, 5, 'Premium facilities and excellent service. Worth the extra cost.', 'pg'),
(5, 5, 3, 'Decent PG but could improve on cleanliness standards.', 'pg');

INSERT INTO reviews (student_id, mess_listing_id, rating, comment, review_type)
VALUES
(1, 1, 4, 'Good quality food with reasonable prices. Delivery service is reliable.', 'mess'),
(2, 2, 5, 'Excellent South Indian food. Fresh and authentic flavors.', 'mess'),
(3, 3, 4, 'Great Punjabi food with generous portions.', 'mess'),
(4, 4, 4, 'Good variety of dishes. Service is prompt.', 'mess');

-- Bookmarks
INSERT INTO bookmarks (student_id, pg_listing_id, bookmark_type)
VALUES
(1, 1, 'pg'),
(1, 4, 'pg'),
(2, 2, 'pg'),
(3, 3, 'pg');

INSERT INTO bookmarks (student_id, mess_listing_id, bookmark_type)
VALUES
(1, 1, 'mess'),
(2, 2, 'mess'),
(3, 3, 'mess');

-- PG Applications
INSERT INTO pg_applications (student_id, pg_listing_id, status, message)
VALUES
(1, 1, 'accepted', 'Interested in the single room. Please let me know about the availability.'),
(2, 2, 'pending', 'Looking for a double sharing room. Would like to visit before finalizing.'),
(3, 3, 'accepted', 'Perfect for my budget and requirements. Ready to move in.'),
(4, 4, 'pending', 'Interested in the premium single room. Please share more details.'),
(5, 5, 'rejected', 'Room requirements do not match my preferences.');

SELECT 'Dummy data inserted successfully!' AS Status;
