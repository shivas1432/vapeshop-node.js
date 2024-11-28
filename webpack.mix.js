// webpack.mix.js

let mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
.js('resources/js/cart.js', 'public/js')
.js('resources/js/product.js', 'public/js')
.js('resources/js/checkout.js', 'public/js')
.js('resources/js/payment.js', 'public/js')
   .css('resources/css/app.css', 'public/css')
   .css('resources/css/orderplaced.css', 'public/css')
   .css('resources/css/header.css', 'public/css')
   .css('resources/css/payment.css', 'public/css')
   .css('resources/css/products.css', 'public/css');
