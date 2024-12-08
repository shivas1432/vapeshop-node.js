const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

// Create a MySQL connection pool using local environment variables
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'your_database',
    connectionLimit: 10, // Adjust the pool size as needed
});

// Export a promise-based version of the pool to make queries easier
const promisePool = pool.promise();

module.exports = promisePool;
