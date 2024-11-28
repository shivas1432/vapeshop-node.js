document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart as an object to handle quantities and prices
    const cart = {};

    // Handle "Add to Cart" button clicks
    document.querySelectorAll('.add-to-cart form').forEach(form => {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent form submission

            // Get product details from the form
            const productName = form.querySelector('.product-name').value.trim();
            const priceText = form.querySelector('.product-price').value.trim();
            const price = parseFloat(priceText);

            if (!isNaN(price)) {
                addToCart(productName, price);
            } else {
                console.error('Invalid price format:', priceText);
            }
        });
    });

    // Function to add items to the cart
    function addToCart(product, price) {
        // Check if the product already exists in the cart
        if (cart[product]) {
            // Increase the quantity if the product is already in the cart
            cart[product].quantity++;
        } else {
            // Add new product with quantity 1 if it's not in the cart
            cart[product] = { quantity: 1, price: price };
        }
        updateCart();
    }

    // Function to update cart display
    function updateCart() {
        const cartItemsElement = document.getElementById('cart-items');
        cartItemsElement.innerHTML = '';

        // Iterate through cart object to display items and their quantities
        for (const product in cart) {
            if (cart.hasOwnProperty(product)) {
                const item = cart[product];
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="cart-product-name">${product}</span>
                    <span class="price-display">£${(item.quantity * item.price).toFixed(2)}</span>
                    <div class="buttons-container">
                        <button class="change-quantity" data-product="${product}" data-action="increase">+</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="change-quantity" data-product="${product}" data-action="decrease">-</button>
                    </div>
                `;
                cartItemsElement.appendChild(li);
            }
        }

        // Update the number of items in the cart
        document.getElementById('cart').querySelector('h3').textContent = `Shopping Cart (${Object.keys(cart).length} items)`;
    }

    // Event delegation for quantity change buttons
    document.getElementById('cart-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('change-quantity')) {
            const product = event.target.getAttribute('data-product');
            const action = event.target.getAttribute('data-action');
            if (action === 'increase') {
                cart[product].quantity++;
            } else if (action === 'decrease') {
                if (cart[product].quantity > 1) {
                    cart[product].quantity--;
                } else {
                    delete cart[product];
                }
            }
            updateCart();
        }
    });

    // Handle proceed to checkout button click
    const proceedToCheckoutButton = document.getElementById('proceed-to-checkout');
    if (proceedToCheckoutButton) {
        proceedToCheckoutButton.addEventListener('click', () => {
            const cartItems = Object.keys(cart).map(product => {
                const item = cart[product];
                return {
                    name: product,
                    price: item.price,
                    totalPrice: item.quantity * item.price,
                    quantity: item.quantity
                };
            });

            fetch('/update-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cartItems })
            })
            .then(response => response.json())
            .then(data => {
                window.location.href = '/basket'; // Redirect to basket page after successful update
            })
            .catch(error => console.error('Error:', error));
        });
    }
});
