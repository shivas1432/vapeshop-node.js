/******/ (() => { // webpackBootstrap
/*!******************************!*\
  !*** ./resources/js/cart.js ***!
  \******************************/
document.addEventListener('DOMContentLoaded', function () {
  // Handle vape type clicks to show products
  document.querySelectorAll('#vape-types .vape-type').forEach(function (element) {
    element.addEventListener('click', function () {
      var type = element.getAttribute('data-type');
      document.querySelectorAll('.vape-items').forEach(function (vapeItems) {
        if (vapeItems.id === type) {
          vapeItems.classList.remove('hidden');
        } else {
          vapeItems.classList.add('hidden');
        }
      });
    });
  });

  // Initialize cart as an object to handle quantities and prices
  var cart = {};

  // Handle "Add to Cart" button clicks
  document.querySelectorAll('.add-to-cart').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent form submission
      var productName = button.getAttribute('data-product');
      var productPrice = parseFloat(button.getAttribute('data-price'));
      addToCart(productName, productPrice);
    });
  });

  // Function to add items to the cart
  function addToCart(productName, price) {
    if (cart[productName]) {
      cart[productName].quantity++;
    } else {
      cart[productName] = {
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
    for (var productName in cart) {
      if (cart.hasOwnProperty(productName)) {
        var item = cart[productName];
        var li = document.createElement('li');
        li.innerHTML = "\n                    <span class=\"cart-product-name\">".concat(productName, "</span>\n                    <span class=\"price-display\">\xA3").concat((item.quantity * item.price).toFixed(2), "</span>\n                    <div class=\"buttons-container\">\n                        <button class=\"change-quantity\" data-product=\"").concat(productName, "\" data-action=\"increase\">+</button>\n                        <span class=\"quantity-display\">").concat(item.quantity, "</span>\n                        <button class=\"change-quantity\" data-product=\"").concat(productName, "\" data-action=\"decrease\">-</button>\n                    </div>\n                ");
        cartItemsElement.appendChild(li);
      }
    }

    // Update the number of items in the cart
    document.getElementById('cart').querySelector('h3').textContent = "Shopping Cart (".concat(Object.keys(cart).length, " items)");
  }

  // Event delegation for quantity change buttons
  document.getElementById('cart-items').addEventListener('click', function (event) {
    if (event.target.classList.contains('change-quantity')) {
      var productName = event.target.getAttribute('data-product');
      var action = event.target.getAttribute('data-action');
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
/******/ })()
;