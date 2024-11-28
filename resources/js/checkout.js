document.addEventListener('DOMContentLoaded', () => {
    const proceedToCheckoutButton = document.getElementById('proceed-to-checkout');

    if (proceedToCheckoutButton) {
        proceedToCheckoutButton.addEventListener('click', () => {
            const cartItems = Array.from(document.querySelectorAll('#cart-items li')).map(li => {
                // Extract product name, price, and quantity
                const productElement = li.querySelector('.cart-product-name');
                const priceElement = li.querySelector('.price-display');
                const quantityElement = li.querySelector('.quantity-display');
                
                // Log elements for debugging
                console.log('Product Element:', productElement);
                console.log('Price Element:', priceElement);
                console.log('Quantity Element:', quantityElement);

                // Check if all elements exist
                if (productElement && priceElement && quantityElement) {
                    const productName = productElement.textContent.trim();
                    const priceText = priceElement.textContent.trim().replace('£', ''); // Remove currency symbol
                    const quantity = parseInt(quantityElement.textContent.trim(), 10); // Parse quantity as integer
                    
                    // Parse price as a float
                    const price = parseFloat(priceText);
                    
                    // Calculate price per item
                    const pricePerItem = (quantity > 0) ? (price / quantity).toFixed(2) : 0; // To avoid division by 0
                    
                    // Return the structured cart item object
                    return {
                        name: productName,
                        price: parseFloat(pricePerItem), // Store price per item
                        totalPrice: price, // Keep the total price
                        quantity: quantity
                    };
                } else {
                    console.error('Missing element in cart item:', li);
                    return null;
                }
            }).filter(item => item !== null); // Filter out any null items

            console.log('Cart Items:', cartItems);

            // Send cart data to the server
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
