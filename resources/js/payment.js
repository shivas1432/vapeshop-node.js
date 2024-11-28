document.addEventListener('DOMContentLoaded', function() {
    const paymentTypeRadios = document.querySelectorAll('input[name="paymentType"]');
    const cardDetailsDiv = document.getElementById('card-details');

    paymentTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (document.getElementById('credit-card').checked || document.getElementById('debit-card').checked) {
                cardDetailsDiv.classList.remove('hidden');
            }
        });
    });

    // Hide card details initially
    cardDetailsDiv.classList.add('hidden');
});
