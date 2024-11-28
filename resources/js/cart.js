document.addEventListener('DOMContentLoaded', () => {
    // Handle vape type clicks to show products
    document.querySelectorAll('#vape-types .vape-type').forEach(element => {
        element.addEventListener('click', () => {
            const type = element.getAttribute('data-type');
            document.querySelectorAll('.vape-items').forEach(vapeItems => {
                if (vapeItems.id === type) {
                    vapeItems.classList.remove('hidden');
                } else {
                    vapeItems.classList.add('hidden');
                }
            });
        });
    });

    // Initialize cart as an object to handle quantities and prices
    const cart = {};

    // Handle "Add to Cart" button clicks
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent form submission
            const productName = button.getAttribute('data-product');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            addToCart(productName, productPrice);
        });
    });

    // Function to add items to the cart
    function addToCart(productName, price) {
        if (cart[productName]) {
            cart[productName].quantity++;
        } else {
            cart[productName] = { quantity: 1, price: price };
        }
        updateCart();
    }

    // Function to update cart display
    function updateCart() {
        const cartItemsElement = document.getElementById('cart-items');
        cartItemsElement.innerHTML = '';

        for (const productName in cart) {
            if (cart.hasOwnProperty(productName)) {
                const item = cart[productName];
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="cart-product-name">${productName}</span>
                    <span class="price-display">£${(item.quantity * item.price).toFixed(2)}</span>
                    <div class="buttons-container">
                        <button class="change-quantity" data-product="${productName}" data-action="increase">+</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="change-quantity" data-product="${productName}" data-action="decrease">-</button>
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
            const productName = event.target.getAttribute('data-product');
            const action = event.target.getAttribute('data-action');
            if (action === 'increase') {
                cart[productName].quantity++;
            } else if (action === 'decrease') {
                if (cart[productName].quantity > 1) {
                    cart[productName].quantity--;
                } else {
                    delete cart[productName];
                }
            }
            updateCart();
        }
    });
});
