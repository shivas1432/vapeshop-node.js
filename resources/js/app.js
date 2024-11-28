document.addEventListener('DOMContentLoaded', function() {
    const vapeTypes = document.querySelectorAll('.vape-type');
    console.log(vapeTypes);
    if (vapeTypes.length === 0) {
        console.error('No elements with class .vape-type were found.');
    }
    vapeTypes.forEach(vapeType => {
        vapeType.addEventListener('click', function() {
            // Remove 'active' class from all vape types
            vapeTypes.forEach(vt => vt.classList.remove('active'));

            // Add 'active' class to the clicked vape type
            this.classList.add('active');
        });
    });
});

