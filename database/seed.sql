-- RoomNook AI Sample Data
USE roomnook_ai;

-- Insert sample students
INSERT INTO students (name, email, password, phone, university, course, year_of_study, budget_min, budget_max, preferred_location, food_preference, cleanliness_level, lifestyle, smoking_preference) VALUES
('Rohan Sharma', 'rohan@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543210', 'DIT University', 'Computer Science', 3, 4000, 8000, 'Clement Town', 'veg', 'very_clean', 'early_bird', 'non_smoker'),
('Arjun Negi', 'arjun@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543211', 'DIT University', 'Electronics', 2, 5000, 10000, 'Clement Town', 'non-veg', 'moderate', 'night_owl', 'okay_with_smoking'),
('Priya Singh', 'priya@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543212', 'DIT University', 'Business', 4, 6000, 12000, 'Rajpur Road', 'both', 'moderate', 'flexible', 'non_smoker'),
('Amit Kumar', 'amit@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543213', 'DIT University', 'Mechanical', 1, 3000, 6000, 'Clement Town', 'veg', 'casual', 'flexible', 'non_smoker');

-- Insert sample PG owners
INSERT INTO pg_owners (name, email, password, phone, address, verification_status) VALUES
('Rajesh Gupta', 'rajesh@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543220', '123 Clement Town, Dehradun', 'verified'),
('Sunita Devi', 'sunita@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543221', '456 Rajpur Road, Dehradun', 'verified'),
('Vikram Singh', 'vikram@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543222', '789 Clement Town, Dehradun', 'verified');

-- Insert sample admin
INSERT INTO admins (name, email, password, role) VALUES
('Admin User', 'admin@roomnook.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 'super_admin');

-- Insert sample PG listings
INSERT INTO pg_listings (owner_id, title, description, address, location, rent_amount, deposit_amount, room_type, gender_preference, available_from, amenities, rules, status, verification_status) VALUES
(1, 'GE Comfort Stay', 'Comfortable PG near DIT University with all amenities', '123 Clement Town, Dehradun', 'Clement Town', 5500, 10000, 'double', 'any', '2024-01-01', '["WiFi", "AC", "Geyser", "Washing Machine", "Parking"]', 'No smoking, No pets, Maintain cleanliness', 'active', 'verified'),
(1, 'Hillside PG', 'Beautiful PG with mountain view', '456 Clement Town, Dehradun', 'Clement Town', 6500, 12000, 'single', 'any', '2024-01-15', '["WiFi", "AC", "Geyser", "Washing Machine", "Parking", "Garden"]', 'No smoking, No pets', 'active', 'verified'),
(2, 'Rajpur Heights', 'Modern PG in Rajpur Road area', '789 Rajpur Road, Dehradun', 'Rajpur Road', 7000, 15000, 'triple', 'any', '2024-02-01', '["WiFi", "AC", "Geyser", "Washing Machine", "Parking", "Gym"]', 'No smoking, No pets, Maintain cleanliness', 'active', 'verified');

-- Insert sample roommate profiles
INSERT INTO roommate_profile (student_id, bio, interests, study_schedule, social_level, party_frequency, guest_policy, is_looking_for_roommate) VALUES
(1, 'Friendly and studious student looking for a clean roommate', '["Coding", "Music", "Sports"]', 'Morning 8AM-12PM, Evening 6PM-10PM', 'ambivert', 'sometimes', 'moderate', TRUE),
(2, 'Easy-going person who loves to socialize', '["Gaming", "Movies", "Cooking"]', 'Flexible', 'extrovert', 'often', 'flexible', TRUE),
(3, 'Focused on studies but also enjoys company', '["Reading", "Yoga", "Photography"]', 'Morning 7AM-1PM, Evening 5PM-9PM', 'introvert', 'rarely', 'strict', TRUE);

-- Insert sample mess listings
INSERT INTO mess_listings (name, description, address, location, monthly_cost, food_type, meal_timing, contact_number, rating, status) VALUES
('Annapurna Veg Mess', 'Pure vegetarian mess with home-style cooking', '123 Clement Town, Dehradun', 'Clement Town', 2500, 'veg', 'Breakfast: 7-9AM, Lunch: 12-2PM, Dinner: 7-9PM', '9876543300', 4.5, 'active'),
('Tasty Bites', 'Multi-cuisine mess with both veg and non-veg options', '456 Clement Town, Dehradun', 'Clement Town', 3000, 'both', 'Breakfast: 7-9AM, Lunch: 12-2PM, Dinner: 7-9PM', '9876543301', 4.2, 'active'),
('Rajpur Mess', 'Traditional North Indian food', '789 Rajpur Road, Dehradun', 'Rajpur Road', 2800, 'both', 'Breakfast: 7-9AM, Lunch: 12-2PM, Dinner: 7-9PM', '9876543302', 4.0, 'active');

-- Insert sample reviews
INSERT INTO reviews (student_id, pg_listing_id, rating, comment, review_type) VALUES
(1, 1, 5, 'Great place to stay, very clean and comfortable', 'pg'),
(2, 1, 4, 'Good PG with all amenities, owner is helpful', 'pg'),
(3, 2, 5, 'Excellent location and facilities', 'pg');

INSERT INTO reviews (student_id, mess_listing_id, rating, comment, review_type) VALUES
(1, 1, 5, 'Delicious vegetarian food, very hygienic', 'mess'),
(2, 2, 4, 'Good variety of food, reasonable price', 'mess'),
(3, 3, 4, 'Traditional taste, good quality', 'mess');

-- Insert sample bookmarks
INSERT INTO bookmarks (student_id, pg_listing_id, bookmark_type) VALUES
(1, 1, 'pg'),
(1, 2, 'pg'),
(2, 1, 'pg'),
(3, 3, 'pg');

INSERT INTO bookmarks (student_id, mess_listing_id, bookmark_type) VALUES
(1, 1, 'mess'),
(2, 2, 'mess'),
(3, 3, 'mess');
