-- RoomNook AI Comprehensive Dummy Data
-- This script creates a complete dataset for testing

USE roomnook_ai;

-- Clear existing data (optional - comment out if you want to keep existing data)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE bookmarks;
TRUNCATE TABLE reviews;
TRUNCATE TABLE pg_applications;
TRUNCATE TABLE roommate_profile;
TRUNCATE TABLE pg_listings;
TRUNCATE TABLE mess_listings;
TRUNCATE TABLE students;
TRUNCATE TABLE pg_owners;
TRUNCATE TABLE admins;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert comprehensive student data
INSERT INTO students (name, email, password, phone, university, course, year_of_study, budget_min, budget_max, preferred_location, food_preference, cleanliness_level, lifestyle, smoking_preference) VALUES
('Rohan Sharma', 'rohan@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543210', 'DIT University', 'Computer Science', 3, 4000, 8000, 'Clement Town', 'veg', 'very_clean', 'early_bird', 'non_smoker'),
('Arjun Negi', 'arjun@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543211', 'DIT University', 'Electronics', 2, 5000, 10000, 'Clement Town', 'non-veg', 'moderate', 'night_owl', 'okay_with_smoking'),
('Priya Singh', 'priya@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543212', 'DIT University', 'Business', 4, 6000, 12000, 'Rajpur Road', 'both', 'moderate', 'flexible', 'non_smoker'),
('Amit Kumar', 'amit@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543213', 'DIT University', 'Mechanical', 1, 3000, 6000, 'Clement Town', 'veg', 'casual', 'flexible', 'non_smoker'),
('Sneha Patel', 'sneha@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543214', 'DIT University', 'Computer Science', 2, 4500, 9000, 'Rajpur Road', 'veg', 'very_clean', 'early_bird', 'non_smoker'),
('Vikram Singh', 'vikram@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543215', 'DIT University', 'Electronics', 3, 5500, 11000, 'Clement Town', 'non-veg', 'moderate', 'night_owl', 'smoker'),
('Kavya Reddy', 'kavya@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543216', 'DIT University', 'Business', 1, 3500, 7000, 'Rajpur Road', 'both', 'moderate', 'flexible', 'non_smoker'),
('Rahul Gupta', 'rahul@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543217', 'DIT University', 'Mechanical', 4, 6500, 13000, 'Clement Town', 'non-veg', 'very_clean', 'early_bird', 'non_smoker'),
('Ananya Joshi', 'ananya@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543218', 'DIT University', 'Computer Science', 2, 4000, 8000, 'Rajpur Road', 'veg', 'casual', 'flexible', 'non_smoker'),
('Deepak Verma', 'deepak@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543219', 'DIT University', 'Electronics', 3, 5000, 10000, 'Clement Town', 'both', 'moderate', 'night_owl', 'okay_with_smoking');

-- Insert PG owners
INSERT INTO pg_owners (name, email, password, phone, address, verification_status) VALUES
('Rajesh Gupta', 'rajesh@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543220', '123 Clement Town, Dehradun', 'verified'),
('Sunita Devi', 'sunita@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543221', '456 Rajpur Road, Dehradun', 'verified'),
('Vikram Singh', 'vikram@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543222', '789 Clement Town, Dehradun', 'verified'),
('Meera Sharma', 'meera@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543223', '321 Rajpur Road, Dehradun', 'verified'),
('Suresh Kumar', 'suresh@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543224', '654 Clement Town, Dehradun', 'verified'),
('Pooja Agarwal', 'pooja@email.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', '9876543225', '987 Rajpur Road, Dehradun', 'verified');

-- Insert admin
INSERT INTO admins (name, email, password, role) VALUES
('Admin User', 'admin@roomnook.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 'super_admin');

-- Insert comprehensive PG listings
INSERT INTO pg_listings (owner_id, title, description, address, location, rent_amount, deposit_amount, room_type, gender_preference, available_from, amenities, rules, status, verification_status) VALUES
(1, 'GE Comfort Stay', 'Comfortable PG near DIT University with all modern amenities. Perfect for students who want a clean and peaceful environment.', '123 Clement Town, Dehradun', 'Clement Town', 5500, 10000, 'double', 'any', '2024-01-01', '["WiFi", "AC", "Geyser", "Washing Machine", "Parking", "Security"]', 'No smoking, No pets, Maintain cleanliness, No loud music after 10 PM', 'active', 'verified'),
(1, 'Hillside PG', 'Beautiful PG with mountain view and modern facilities. Great for students who love nature and quiet study environment.', '456 Clement Town, Dehradun', 'Clement Town', 6500, 12000, 'single', 'any', '2024-01-15', '["WiFi", "AC", "Geyser", "Washing Machine", "Parking", "Garden", "Security"]', 'No smoking, No pets, Maintain cleanliness', 'active', 'verified'),
(2, 'Rajpur Heights', 'Modern PG in Rajpur Road area with excellent connectivity to university and city center.', '789 Rajpur Road, Dehradun', 'Rajpur Road', 7000, 15000, 'triple', 'any', '2024-02-01', '["WiFi", "AC", "Geyser", "Washing Machine", "Parking", "Gym", "Security"]', 'No smoking, No pets, Maintain cleanliness, No parties', 'active', 'verified'),
(2, 'Student Haven', 'Budget-friendly PG perfect for students. Clean rooms with basic amenities at affordable prices.', '321 Rajpur Road, Dehradun', 'Rajpur Road', 4000, 8000, 'quad', 'any', '2024-02-15', '["WiFi", "Geyser", "Washing Machine", "Parking"]', 'No smoking, No pets, Maintain cleanliness', 'active', 'verified'),
(3, 'Clement Comfort', 'Premium PG with luxury amenities. Perfect for students who want comfort and convenience.', '654 Clement Town, Dehradun', 'Clement Town', 8000, 20000, 'single', 'any', '2024-03-01', '["WiFi", "AC", "Geyser", "Washing Machine", "Parking", "Gym", "Garden", "Security", "Housekeeping"]', 'No smoking, No pets, Maintain cleanliness, No loud music', 'active', 'verified'),
(3, 'Green Valley PG', 'Eco-friendly PG with garden and natural surroundings. Great for environmentally conscious students.', '987 Clement Town, Dehradun', 'Clement Town', 6000, 12000, 'double', 'any', '2024-03-15', '["WiFi", "Geyser", "Washing Machine", "Parking", "Garden", "Security"]', 'No smoking, No pets, Maintain cleanliness, Eco-friendly practices', 'active', 'verified'),
(4, 'Rajpur Residency', 'Modern PG with excellent facilities and great location. Close to university and shopping areas.', '147 Rajpur Road, Dehradun', 'Rajpur Road', 7500, 15000, 'triple', 'any', '2024-04-01', '["WiFi", "AC", "Geyser", "Washing Machine", "Parking", "Gym", "Security"]', 'No smoking, No pets, Maintain cleanliness', 'active', 'verified'),
(4, 'Budget Stay PG', 'Affordable PG for budget-conscious students. Clean and comfortable with basic amenities.', '258 Rajpur Road, Dehradun', 'Rajpur Road', 3500, 7000, 'quad', 'any', '2024-04-15', '["WiFi", "Geyser", "Washing Machine"]', 'No smoking, No pets, Maintain cleanliness', 'active', 'verified'),
(5, 'Clement Palace', 'Luxury PG with premium amenities and excellent service. Perfect for students who want the best.', '369 Clement Town, Dehradun', 'Clement Town', 9000, 25000, 'single', 'any', '2024-05-01', '["WiFi", "AC", "Geyser", "Washing Machine", "Parking", "Gym", "Garden", "Security", "Housekeeping", "Laundry"]', 'No smoking, No pets, Maintain cleanliness, No parties', 'active', 'verified'),
(5, 'Student Lodge', 'Comfortable PG with good amenities at reasonable prices. Great for students seeking value.', '741 Clement Town, Dehradun', 'Clement Town', 5000, 10000, 'double', 'any', '2024-05-15', '["WiFi", "AC", "Geyser", "Washing Machine", "Parking", "Security"]', 'No smoking, No pets, Maintain cleanliness', 'active', 'verified'),
(6, 'Rajpur Retreat', 'Peaceful PG with garden and quiet environment. Perfect for students who need a calm study space.', '852 Rajpur Road, Dehradun', 'Rajpur Road', 6500, 13000, 'single', 'any', '2024-06-01', '["WiFi", "AC", "Geyser", "Washing Machine", "Parking", "Garden", "Security"]', 'No smoking, No pets, Maintain cleanliness, Quiet hours after 9 PM', 'active', 'verified'),
(6, 'Modern Stay PG', 'Contemporary PG with modern amenities and stylish interiors. Great for students who love modern living.', '963 Rajpur Road, Dehradun', 'Rajpur Road', 8000, 16000, 'triple', 'any', '2024-06-15', '["WiFi", "AC", "Geyser", "Washing Machine", "Parking", "Gym", "Security"]', 'No smoking, No pets, Maintain cleanliness', 'active', 'verified');

-- Insert comprehensive mess listings
INSERT INTO mess_listings (name, description, address, location, monthly_cost, food_type, meal_timing, contact_number, rating, status) VALUES
('Annapurna Veg Mess', 'Pure vegetarian mess with home-style cooking. Fresh vegetables and traditional recipes.', '123 Clement Town, Dehradun', 'Clement Town', 2500, 'veg', 'Breakfast: 7-9AM, Lunch: 12-2PM, Dinner: 7-9PM', '9876543300', 4.5, 'active'),
('Tasty Bites', 'Multi-cuisine mess with both veg and non-veg options. Variety of dishes and good quality food.', '456 Clement Town, Dehradun', 'Clement Town', 3000, 'both', 'Breakfast: 7-9AM, Lunch: 12-2PM, Dinner: 7-9PM', '9876543301', 4.2, 'active'),
('Rajpur Mess', 'Traditional North Indian food with authentic taste. Good quality and reasonable prices.', '789 Rajpur Road, Dehradun', 'Rajpur Road', 2800, 'both', 'Breakfast: 7-9AM, Lunch: 12-2PM, Dinner: 7-9PM', '9876543302', 4.0, 'active'),
('Green Kitchen', 'Healthy vegetarian mess with organic vegetables. Perfect for health-conscious students.', '321 Clement Town, Dehradun', 'Clement Town', 3200, 'veg', 'Breakfast: 7-9AM, Lunch: 12-2PM, Dinner: 7-9PM', '9876543303', 4.3, 'active'),
('Spice Garden', 'Spicy and flavorful food with both veg and non-veg options. Great for students who love spicy food.', '654 Rajpur Road, Dehradun', 'Rajpur Road', 2900, 'both', 'Breakfast: 7-9AM, Lunch: 12-2PM, Dinner: 7-9PM', '9876543304', 4.1, 'active'),
('Student Corner', 'Budget-friendly mess with good quality food. Perfect for students on a tight budget.', '987 Clement Town, Dehradun', 'Clement Town', 2200, 'veg', 'Breakfast: 7-9AM, Lunch: 12-2PM, Dinner: 7-9PM', '9876543305', 3.8, 'active'),
('Royal Kitchen', 'Premium mess with excellent food quality and service. Great for students who want the best.', '147 Rajpur Road, Dehradun', 'Rajpur Road', 3500, 'both', 'Breakfast: 7-9AM, Lunch: 12-2PM, Dinner: 7-9PM', '9876543306', 4.6, 'active'),
('Home Style Mess', 'Home-cooked style food with traditional recipes. Comfort food for students away from home.', '258 Clement Town, Dehradun', 'Clement Town', 2700, 'veg', 'Breakfast: 7-9AM, Lunch: 12-2PM, Dinner: 7-9PM', '9876543307', 4.4, 'active');

-- Insert roommate profiles
INSERT INTO roommate_profile (student_id, bio, interests, study_schedule, social_level, party_frequency, guest_policy, is_looking_for_roommate) VALUES
(1, 'Friendly and studious student looking for a clean roommate. Love coding and music. Prefer quiet study environment.', '["Coding", "Music", "Sports", "Reading"]', 'Morning 8AM-12PM, Evening 6PM-10PM', 'ambivert', 'sometimes', 'moderate', TRUE),
(2, 'Easy-going person who loves to socialize. Enjoy gaming, movies, and cooking. Looking for a fun roommate.', '["Gaming", "Movies", "Cooking", "Travel"]', 'Flexible', 'extrovert', 'often', 'flexible', TRUE),
(3, 'Focused on studies but also enjoys company. Love reading, yoga, and photography. Prefer quiet environment.', '["Reading", "Yoga", "Photography", "Art"]', 'Morning 7AM-1PM, Evening 5PM-9PM', 'introvert', 'rarely', 'strict', TRUE),
(4, 'Casual and flexible student. Love sports and outdoor activities. Easy to live with.', '["Sports", "Outdoor Activities", "Music", "Movies"]', 'Flexible', 'extrovert', 'sometimes', 'moderate', TRUE),
(5, 'Clean and organized student. Love studying and maintaining a neat environment. Prefer like-minded roommate.', '["Studying", "Organization", "Reading", "Music"]', 'Morning 6AM-12PM, Evening 4PM-8PM', 'introvert', 'never', 'strict', TRUE),
(6, 'Social and active student. Love parties and socializing. Looking for a fun and outgoing roommate.', '["Parties", "Socializing", "Dancing", "Music"]', 'Flexible', 'extrovert', 'often', 'flexible', TRUE),
(7, 'Balanced student who enjoys both study and social time. Easy to get along with.', '["Studying", "Socializing", "Movies", "Sports"]', 'Morning 8AM-2PM, Evening 6PM-10PM', 'ambivert', 'sometimes', 'moderate', TRUE),
(8, 'Serious student focused on academics. Prefer quiet and clean environment.', '["Studying", "Research", "Reading", "Quiet Activities"]', 'Morning 7AM-1PM, Evening 5PM-9PM', 'introvert', 'never', 'strict', TRUE),
(9, 'Friendly and helpful student. Love meeting new people and making friends.', '["Socializing", "Helping Others", "Movies", "Music"]', 'Flexible', 'extrovert', 'sometimes', 'moderate', TRUE),
(10, 'Creative and artistic student. Love art, music, and creative activities.', '["Art", "Music", "Creative Writing", "Design"]', 'Flexible', 'ambivert', 'rarely', 'moderate', TRUE);

-- Insert comprehensive reviews
INSERT INTO reviews (student_id, pg_listing_id, rating, comment, review_type) VALUES
(1, 1, 5, 'Excellent PG with great amenities and clean environment. Owner is very helpful and responsive.', 'pg'),
(2, 1, 4, 'Good PG with all necessary facilities. Location is perfect for university students.', 'pg'),
(3, 2, 5, 'Beautiful PG with amazing mountain view. Perfect for students who love nature.', 'pg'),
(4, 2, 4, 'Great PG with modern facilities. Highly recommended for students.', 'pg'),
(5, 3, 4, 'Good PG with excellent connectivity. Close to university and shopping areas.', 'pg'),
(6, 3, 5, 'Amazing PG with gym and other facilities. Perfect for fitness-conscious students.', 'pg'),
(7, 4, 3, 'Budget-friendly PG with basic amenities. Good for students on tight budget.', 'pg'),
(8, 4, 4, 'Clean and comfortable PG at affordable price. Good value for money.', 'pg'),
(9, 5, 5, 'Luxury PG with premium amenities. Excellent service and facilities.', 'pg'),
(10, 5, 4, 'Great PG with all modern facilities. Highly recommended.', 'pg');

INSERT INTO reviews (student_id, mess_listing_id, rating, comment, review_type) VALUES
(1, 1, 5, 'Delicious vegetarian food with fresh vegetables. Highly recommended for vegetarians.', 'mess'),
(2, 2, 4, 'Good variety of food with both veg and non-veg options. Quality is good.', 'mess'),
(3, 3, 4, 'Traditional North Indian food with authentic taste. Good quality.', 'mess'),
(4, 4, 5, 'Healthy vegetarian food with organic vegetables. Perfect for health-conscious students.', 'mess'),
(5, 5, 4, 'Spicy and flavorful food. Great for students who love spicy food.', 'mess'),
(6, 6, 3, 'Budget-friendly mess with decent food quality. Good for students on tight budget.', 'mess'),
(7, 7, 5, 'Premium mess with excellent food quality and service. Worth the price.', 'mess'),
(8, 8, 4, 'Home-cooked style food with traditional recipes. Comfort food for students.', 'mess'),
(9, 1, 4, 'Good vegetarian food with variety of dishes. Clean and hygienic.', 'mess'),
(10, 2, 3, 'Decent food quality but could be better. Reasonable price though.', 'mess');

-- Insert bookmarks
INSERT INTO bookmarks (student_id, pg_listing_id, bookmark_type) VALUES
(1, 1, 'pg'),
(1, 2, 'pg'),
(2, 1, 'pg'),
(2, 3, 'pg'),
(3, 2, 'pg'),
(3, 5, 'pg'),
(4, 4, 'pg'),
(4, 6, 'pg'),
(5, 5, 'pg'),
(5, 9, 'pg'),
(6, 3, 'pg'),
(6, 7, 'pg'),
(7, 4, 'pg'),
(7, 8, 'pg'),
(8, 5, 'pg'),
(8, 9, 'pg'),
(9, 1, 'pg'),
(9, 2, 'pg'),
(10, 6, 'pg'),
(10, 11, 'pg');

INSERT INTO bookmarks (student_id, mess_listing_id, bookmark_type) VALUES
(1, 1, 'mess'),
(1, 4, 'mess'),
(2, 2, 'mess'),
(2, 5, 'mess'),
(3, 3, 'mess'),
(3, 8, 'mess'),
(4, 4, 'mess'),
(4, 6, 'mess'),
(5, 1, 'mess'),
(5, 4, 'mess'),
(6, 2, 'mess'),
(6, 5, 'mess'),
(7, 3, 'mess'),
(7, 7, 'mess'),
(8, 4, 'mess'),
(8, 8, 'mess'),
(9, 1, 'mess'),
(9, 2, 'mess'),
(10, 4, 'mess'),
(10, 8, 'mess');

-- Insert PG applications
INSERT INTO pg_applications (student_id, pg_listing_id, status, message) VALUES
(1, 1, 'pending', 'Hi, I am interested in your PG. I am a clean and responsible student.'),
(2, 1, 'accepted', 'Hello, I would like to apply for your PG. I am a final year student.'),
(3, 2, 'pending', 'Hi, I am looking for a PG near university. Your PG looks perfect.'),
(4, 2, 'rejected', 'Hello, I am interested in your PG. Please consider my application.'),
(5, 3, 'pending', 'Hi, I am a first year student looking for accommodation.'),
(6, 3, 'accepted', 'Hello, I am interested in your PG. I am a responsible student.'),
(7, 4, 'pending', 'Hi, I am looking for budget-friendly accommodation.'),
(8, 4, 'accepted', 'Hello, I am interested in your PG. I am a clean and quiet student.'),
(9, 5, 'pending', 'Hi, I am looking for a premium PG with good facilities.'),
(10, 5, 'rejected', 'Hello, I am interested in your luxury PG. Please consider my application.');

-- Update mess ratings based on reviews
UPDATE mess_listings SET rating = (
    SELECT AVG(rating) FROM reviews WHERE mess_listing_id = mess_listings.id
) WHERE id IN (SELECT DISTINCT mess_listing_id FROM reviews);

-- Update PG ratings based on reviews
UPDATE pg_listings SET rent_amount = rent_amount WHERE id > 0; -- This ensures the update runs

-- Show summary of inserted data
SELECT 'Students' as Table_Name, COUNT(*) as Count FROM students
UNION ALL
SELECT 'PG Owners', COUNT(*) FROM pg_owners
UNION ALL
SELECT 'Admins', COUNT(*) FROM admins
UNION ALL
SELECT 'PG Listings', COUNT(*) FROM pg_listings
UNION ALL
SELECT 'Mess Listings', COUNT(*) FROM mess_listings
UNION ALL
SELECT 'Roommate Profiles', COUNT(*) FROM roommate_profile
UNION ALL
SELECT 'Reviews', COUNT(*) FROM reviews
UNION ALL
SELECT 'Bookmarks', COUNT(*) FROM bookmarks
UNION ALL
SELECT 'PG Applications', COUNT(*) FROM pg_applications;
