const express = require('express');
const router = express.Router();

// Route to render the basket.ejs page with cart items
router.get('/basket', (req, res) => {
    // Retrieve cart items from the session
    const cartItems = req.session.cartItems || [];

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0).toFixed(2);

    // Render the basket.ejs view and pass cart items and total price
    res.render('basket', { title: 'Cart | Vape Shop', cart: cartItems, totalPrice });
});

// Route to handle checkout submission and redirect to payment page
router.post('/checkout', (req, res) => {
    // You can perform additional processing here if needed

    // Redirect to the payment page
    res.redirect('/payment');
});

// Route to render the payment.ejs page
router.get('/payment', (req, res) => {
    // Retrieve cart items from the session
    const cartItems = req.session.cartItems || [];

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0).toFixed(2);

    // Render the payment.ejs view and pass cart items and total price
    res.render('payment', { title: 'Payment | Vape Shop', cart: cartItems, totalPrice });
});

// Route to handle payment processing and order confirmation
router.post('/process-checkout', (req, res) => {
    const cartItems = req.session.cartItems || [];
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    
    const address = {
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    };
    
    const paymentType = req.body.paymentType;
    const orderNumber = generateOrderNumber(); // Implement a function to generate an order number

    // Clear the cart
    req.session.cartItems = [];

    // Render the order-placed.ejs view and pass order details
    res.render('order-placed', {
        title: 'Order Placed | Vape Shop',
        orderNumber,
        totalPrice,
        cart: cartItems,
        address,
        paymentType
    });
});

// Function to generate a unique order number
function generateOrderNumber() {
    return 'ORD' + Math.floor(Math.random() * 1000000);
}

module.exports = router;
