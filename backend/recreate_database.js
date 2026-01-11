const mysql = require('mysql2/promise');
const fs = require('fs');

async function recreateDatabase() {
  let connection;
  
  try {
    // Connect to MySQL server (without specifying database)
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: ''
    });

    console.log('Connected to MySQL server');

    // Drop database if exists
    await connection.execute('DROP DATABASE IF EXISTS roomnook_ai');
    console.log('Dropped existing database');

    // Create new database
    await connection.execute('CREATE DATABASE roomnook_ai');
    console.log('Created new database');

    // Use the new database
    await connection.query('USE roomnook_ai');
    console.log('Using roomnook_ai database');

    // Read and execute schema
    const schemaSQL = fs.readFileSync('recreate_database.sql', 'utf8');
    const schemaStatements = schemaSQL.split(';').filter(stmt => stmt.trim());
    
    for (const statement of schemaStatements) {
      if (statement.trim()) {
        await connection.query(statement);
      }
    }
    console.log('Schema created successfully');

    // Read and execute dummy data
    const dataSQL = fs.readFileSync('insert_dummy_data.sql', 'utf8');
    const dataStatements = dataSQL.split(';').filter(stmt => stmt.trim());
    
    for (const statement of dataStatements) {
      if (statement.trim()) {
        await connection.query(statement);
      }
    }
    console.log('Dummy data inserted successfully');

    // Verify data
    const [students] = await connection.query('SELECT COUNT(*) as count FROM students');
    const [pgListings] = await connection.query('SELECT COUNT(*) as count FROM pg_listings');
    const [messListings] = await connection.query('SELECT COUNT(*) as count FROM mess_listings');
    
    console.log('\n=== Database Summary ===');
    console.log(`Students: ${students[0].count}`);
    console.log(`PG Listings: ${pgListings[0].count}`);
    console.log(`Mess Listings: ${messListings[0].count}`);
    console.log('========================\n');

    console.log('✅ Database recreation completed successfully!');
    console.log('🔐 Test login credentials:');
    console.log('   Student: rohan@email.com / password123');
    console.log('   Owner: rajesh@email.com / password123');
    console.log('   Admin: admin@roomnook.com / password123');

  } catch (error) {
    console.error('❌ Error recreating database:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

recreateDatabase();
