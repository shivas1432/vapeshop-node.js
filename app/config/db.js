const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables
const url = require('url');

// Check if DB_URL is provided
const dbConfig = process.env.DB_URL
  ? (() => {
      const { hostname, port, auth, pathname } = new URL(process.env.DB_URL);
      const [user, password] = auth.split(':');
      return {
        host: hostname,
        port: port || 3306,
        user: user,
        password: password,
        database: pathname.replace('/', ''), // Remove leading slash
      };
    })()
  : {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'your_database',
      port: process.env.DB_PORT || 3306,
    };

// Create a MySQL connection pool
const pool = mysql.createPool({
  ...dbConfig,
  connectionLimit: 10, // Adjust the pool size as needed
});

// Export a promise-based version of the pool to make queries easier
const promisePool = pool.promise();
module.exports = promisePool;
