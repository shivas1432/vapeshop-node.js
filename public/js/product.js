/******/ (() => { // webpackBootstrap
/*!*********************************!*\
  !*** ./resources/js/product.js ***!
  \*********************************/
document.addEventListener('DOMContentLoaded', function () {
  // Initialize cart as an object to handle quantities and prices
  var cart = {};

  // Handle "Add to Cart" button clicks
  document.querySelectorAll('.add-to-cart form').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent form submission

      // Get product details from the form
      var productName = form.querySelector('.product-name').value.trim();
      var priceText = form.querySelector('.product-price').value.trim();
      var price = parseFloat(priceText);
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
      cart[product] = {
        quantity: 1,
        price: price
      };
    }
    updateCart();
  }

  // Function to update cart display
  function updateCart() {
    var cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    // Iterate through cart object to display items and their quantities
    for (var product in cart) {
      if (cart.hasOwnProperty(product)) {
        var item = cart[product];
        var li = document.createElement('li');
        li.innerHTML = "\n                    <span class=\"cart-product-name\">".concat(product, "</span>\n                    <span class=\"price-display\">\xA3").concat((item.quantity * item.price).toFixed(2), "</span>\n                    <div class=\"buttons-container\">\n                        <button class=\"change-quantity\" data-product=\"").concat(product, "\" data-action=\"increase\">+</button>\n                        <span class=\"quantity-display\">").concat(item.quantity, "</span>\n                        <button class=\"change-quantity\" data-product=\"").concat(product, "\" data-action=\"decrease\">-</button>\n                    </div>\n                ");
        cartItemsElement.appendChild(li);
      }
    }

    // Update the number of items in the cart
    document.getElementById('cart').querySelector('h3').textContent = "Shopping Cart (".concat(Object.keys(cart).length, " items)");
  }

  // Event delegation for quantity change buttons
  document.getElementById('cart-items').addEventListener('click', function (event) {
    if (event.target.classList.contains('change-quantity')) {
      var product = event.target.getAttribute('data-product');
      var action = event.target.getAttribute('data-action');
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
  var proceedToCheckoutButton = document.getElementById('proceed-to-checkout');
  if (proceedToCheckoutButton) {
    proceedToCheckoutButton.addEventListener('click', function () {
      var cartItems = Object.keys(cart).map(function (product) {
        var item = cart[product];
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