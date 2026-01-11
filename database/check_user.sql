USE roomnook_ai;

-- Check if the user exists
SELECT id, name, email, password FROM students WHERE email = 'rohan@email.com';

-- Check if the password is hashed
SELECT 
  id, 
  name, 
  email, 
  CASE 
    WHEN password LIKE '$2b$%' THEN 'Password is hashed'
    ELSE 'Password is NOT hashed'
  END as password_status
FROM students WHERE email = 'rohan@email.com';
