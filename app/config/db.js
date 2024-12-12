const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

// Custom parsing logic for DB_URL
const parseDbUrl = (dbUrl) => {
  const dbUrlRegex = /^(mysql:\/\/)(.*):(.*)@(.*):(\d+)\/(.*)$/;
  const match = dbUrl.match(dbUrlRegex);

  if (!match) {
    throw new Error("Invalid DB_URL format. Please check the configuration.");
  }

  const [, , user, password, host, port, database] = match;
  return {
    host,
    port: parseInt(port, 10),
    user,
    password,
    database,
  };
};

// Check if DB_URL is provided
const dbConfig = process.env.DB_URL
  ? parseDbUrl(process.env.DB_URL)
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
