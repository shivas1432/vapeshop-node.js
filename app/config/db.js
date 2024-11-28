const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env
const url = require('url'); // Import the URL module for parsing the database URL

// Check if JAWSDB_URL is defined in the environment variables
const dbUrl = process.env.JAWSDB_URL;

let pool;

if (dbUrl) {
    // Parse the JAWSDB_URL if it is available
    const parsedUrl = url.parse(dbUrl);

    // Create a MySQL connection pool using the parsed JAWSDB_URL
    pool = mysql.createPool({
        host: parsedUrl.hostname, // Host from the JAWSDB URL
        user: parsedUrl.auth.split(':')[0], // Username from the JAWSDB URL
        password: parsedUrl.auth.split(':')[1], // Password from the JAWSDB URL
        database: parsedUrl.pathname.split('/')[1], // Database name from the JAWSDB URL
        connectionLimit: 10 // Adjust the pool size as needed
    });
} else {
    // Fallback to local environment variables if JAWSDB_URL is not defined
    pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'your_database',
        connectionLimit: 10
    });
}

// Export a promise-based version of the pool to make queries easier
const promisePool = pool.promise();

module.exports = promisePool;
