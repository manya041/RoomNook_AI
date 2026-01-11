USE roomnook_ai;

-- Delete existing test user if exists
DELETE FROM students WHERE email = 'rohan@email.com';

-- Insert a test user with properly hashed password
-- Password 'password123' hashed with bcrypt
INSERT INTO students (
  name, 
  email, 
  password, 
  phone, 
  university, 
  course, 
  year_of_study, 
  budget_min, 
  budget_max, 
  preferred_location, 
  food_preference, 
  cleanliness_level, 
  lifestyle, 
  smoking_preference
) VALUES (
  'Rohan Kumar',
  'rohan@email.com',
  '$2b$10$rQZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8QZ8', -- This is a placeholder, we'll hash it properly
  '+91-9876543210',
  'Delhi University',
  'Computer Science',
  3,
  5000,
  8000,
  'Central Delhi',
  'vegetarian',
  'moderate',
  'balanced',
  'non_smoker'
);

-- Check if user was created
SELECT id, name, email FROM students WHERE email = 'rohan@email.com';
