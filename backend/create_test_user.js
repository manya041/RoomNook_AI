const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function createTestUser() {
  try {
    // Connect to database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'roomnook_ai'
    });

    // Hash the password
    const hashedPassword = await bcrypt.hash('password123', 10);
    console.log('Hashed password:', hashedPassword);

    // Delete existing user if exists
    await connection.execute('DELETE FROM students WHERE email = ?', ['rohan@email.com']);

    // Insert new user
    const [result] = await connection.execute(`
      INSERT INTO students (
        name, email, password, phone, university, course, year_of_study,
        budget_min, budget_max, preferred_location, food_preference,
        cleanliness_level, lifestyle, smoking_preference
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Rohan Kumar',
      'rohan@email.com',
      hashedPassword,
      '+91-9876543210',
      'Delhi University',
      'Computer Science',
      3,
      5000,
      8000,
      'Central Delhi',
      'veg',
      'moderate',
      'flexible',
      'non_smoker'
    ]);

    console.log('User created successfully with ID:', result.insertId);

    // Verify user exists
    const [rows] = await connection.execute(
      'SELECT id, name, email FROM students WHERE email = ?',
      ['rohan@email.com']
    );

    console.log('User in database:', rows[0]);

    await connection.end();
    console.log('Database connection closed.');

  } catch (error) {
    console.error('Error creating test user:', error);
  }
}

createTestUser();
