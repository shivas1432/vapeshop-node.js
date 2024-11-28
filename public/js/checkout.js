/******/ (() => { // webpackBootstrap
/*!**********************************!*\
  !*** ./resources/js/checkout.js ***!
  \**********************************/
document.addEventListener('DOMContentLoaded', function () {
  var proceedToCheckoutButton = document.getElementById('proceed-to-checkout');
  if (proceedToCheckoutButton) {
    proceedToCheckoutButton.addEventListener('click', function () {
      var cartItems = Array.from(document.querySelectorAll('#cart-items li')).map(function (li) {
        // Extract product name, price, and quantity
        var productElement = li.querySelector('.cart-product-name');
        var priceElement = li.querySelector('.price-display');
        var quantityElement = li.querySelector('.quantity-display');

        // Log elements for debugging
        console.log('Product Element:', productElement);
        console.log('Price Element:', priceElement);
        console.log('Quantity Element:', quantityElement);

        // Check if all elements exist
        if (productElement && priceElement && quantityElement) {
          var productName = productElement.textContent.trim();
          var priceText = priceElement.textContent.trim().replace('£', ''); // Remove currency symbol
          var quantity = parseInt(quantityElement.textContent.trim(), 10); // Parse quantity as integer

          // Parse price as a float
          var price = parseFloat(priceText);

          // Calculate price per item
          var pricePerItem = quantity > 0 ? (price / quantity).toFixed(2) : 0; // To avoid division by 0

          // Return the structured cart item object
          return {
            name: productName,
            price: parseFloat(pricePerItem),
            // Store price per item
            totalPrice: price,
            // Keep the total price
            quantity: quantity
          };
        } else {
          console.error('Missing element in cart item:', li);
          return null;
        }
      }).filter(function (item) {
        return item !== null;
      }); // Filter out any null items

      console.log('Cart Items:', cartItems);

      // Send cart data to the server
      fetch('/update-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems: cartItems
        })
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        window.location.href = '/basket'; // Redirect to basket page after successful update
      })["catch"](function (error) {
        return console.error('Error:', error);
      });
    });
  }
});
/******/ })()
;