const express = require('express');
const fs = require('fs').promises;  // Use promises API for async file reading
const path = require('path');
const db = require('../../app/config/db'); // Adjust the path as needed

const router = express.Router();

// Path to the SQL file containing insert queries
const sqlFilePath = path.join(__dirname, '../../app/config/insert-data.sql');  // Adjust path if necessary

// Function to insert data from the SQL file
async function insertData() {
    try {
        // Read the SQL file content asynchronously
        const sqlQuery = await fs.readFile(sqlFilePath, 'utf-8');

        // Split the SQL queries if multiple queries are in the SQL file (separated by semicolons)
        const queries = sqlQuery.split(';').map(query => query.trim()).filter(Boolean);

        // Execute each query in the SQL file
        for (const query of queries) {
            await db.query(query);  // Use your MySQL pool or connection to execute the query
        }

        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
        throw error;  // Propagate the error to be handled in the route
    }
}

// Route to trigger the data insertion
router.get('/insert-data', async (req, res) => {
    try {
        await insertData();  // Call the insertData function
        res.send('Data inserted successfully');
    } catch (error) {
        res.status(500).send('Error inserting data');
    }
});

module.exports = router;
