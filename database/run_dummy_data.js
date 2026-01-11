const fs = require('fs');
const mysql = require('mysql2');
const path = require('path');

// Path to the SQL file
const sqlFilePath = path.join(__dirname, 'comprehensive_dummy_data.sql');

// Read the SQL file
console.log('Reading SQL file...');
const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

// Common passwords to try based on project documentation
const passwords = ['', 'root', 'password'];
let connectionSuccessful = false;

// Try each password
console.log('Attempting to connect to MySQL...');

function tryConnection(index) {
  if (index >= passwords.length) {
    console.error('❌ Could not connect to MySQL with any of the common passwords.');
    console.error('Please check:');
    console.error('1. MySQL is installed and running');
    console.error('2. Try one of these passwords manually: (empty), "root", or "password"');
    process.exit(1);
    return;
  }

  const password = passwords[index];
  console.log(`Trying with password: "${password || '(empty)'}"`);

  // Create a connection to the MySQL server
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    multipleStatements: true
  });

  // Test connection
  connection.connect((err) => {
    if (err) {
      console.log(`Connection failed with password "${password || '(empty)'}"...`);
      connection.end();
      tryConnection(index + 1);
    } else {
      console.log(`✅ Connected successfully with password "${password || '(empty)'}"!`);
      
      // First ensure the database exists
      connection.query('CREATE DATABASE IF NOT EXISTS roomnook_ai', (err) => {
        if (err) {
          console.error('Error creating database:', err);
          connection.end();
          process.exit(1);
        }
        
        console.log('Database roomnook_ai exists or was created successfully');
        
        // Use the database
        connection.query('USE roomnook_ai', (err) => {
          if (err) {
            console.error('Error selecting database:', err);
            connection.end();
            process.exit(1);
          }
          
          console.log('Ensuring timestamp defaults on tables...');
          const fixes = [
            "ALTER TABLE students MODIFY created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, MODIFY updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
            "ALTER TABLE pg_owners MODIFY created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, MODIFY updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
            "ALTER TABLE admins MODIFY created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, MODIFY updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
            "ALTER TABLE pg_listings MODIFY created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, MODIFY updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
            "ALTER TABLE roommate_profile MODIFY created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, MODIFY updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
            "ALTER TABLE mess_listings MODIFY created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, MODIFY updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
            "ALTER TABLE reviews MODIFY created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, MODIFY updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
            "ALTER TABLE bookmarks MODIFY created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, MODIFY updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
            "ALTER TABLE pg_applications MODIFY created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, MODIFY updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
          ]
          const runFixes = () => new Promise((resolve) => {
            const runNext = (i) => {
              if (i >= fixes.length) return resolve()
              connection.query(fixes[i], () => runNext(i + 1))
            }
            runNext(0)
          })
          runFixes().then(() => {
            console.log('Executing SQL script...')
            // Execute the SQL script
            connection.query(sqlContent, (err, results) => {
              if (err) {
                console.error('Error executing SQL script:', err);
                connection.end();
                process.exit(1);
              }
            
            console.log('✅ Dummy data inserted successfully!');
            console.log('Database has been populated with realistic data for:');
            console.log('- 10 Students');
            console.log('- 6 PG Owners');
            console.log('- 1 Admin');
            console.log('- 9 PG Listings');
            console.log('- 8 Mess Listings');
            console.log('- 10 Roommate Profiles');
            console.log('- 20 Reviews (10 for PGs, 10 for Mess)');
            console.log('- Bookmarks and PG Applications');
            console.log('\nTest Credentials:');
            console.log('Student: rohan@email.com / password123');
            console.log('Owner: rajesh@email.com / password123');
            console.log('Admin: admin@roomnook.com / password123');
            
            connection.end();
          });
          })
        });
      });
    }
  });
}

// Start trying connections
tryConnection(0);