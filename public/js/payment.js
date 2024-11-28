/******/ (() => { // webpackBootstrap
/*!*********************************!*\
  !*** ./resources/js/payment.js ***!
  \*********************************/
document.addEventListener('DOMContentLoaded', function () {
  var paymentTypeRadios = document.querySelectorAll('input[name="paymentType"]');
  var cardDetailsDiv = document.getElementById('card-details');
  paymentTypeRadios.forEach(function (radio) {
    radio.addEventListener('change', function () {
      if (document.getElementById('credit-card').checked || document.getElementById('debit-card').checked) {
        cardDetailsDiv.classList.remove('hidden');
      }
    });
  });

  // Hide card details initially
  cardDetailsDiv.classList.add('hidden');
});
/******/ })()
;