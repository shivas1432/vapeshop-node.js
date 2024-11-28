require('dotenv').config(); // Load environment variables

const express = require('express');
const path = require('path');
const session = require('express-session');
const basketRoute = require('./routes/basketRoute');
const dataInsertRoute = require('./routes/dataInsertRoute');
const pool = require('../app/config/db');

const app = express();
const port = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../resources/views'));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for session management
app.use(session({
    secret: process.env.SECRET_KEY, // Use secret key from .env
    resave: false,
    saveUninitialized: true,
}));

// Home route to render the index.ejs page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home | Vape Shop' });
});

// POST route to update the cart
app.post('/update-cart', (req, res) => {
    const cartItems = req.body.cartItems || [];
    req.session.cartItems = cartItems;
    res.json({ success: true });
});

// Use the basket route
app.use('/', basketRoute);

// Use the data insert route
app.use('/', dataInsertRoute);

// Define a route to render products
app.get('/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM vape_shop_products');
        res.render('products', { products: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving products');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
