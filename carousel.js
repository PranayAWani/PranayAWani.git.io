document.addEventListener('DOMContentLoaded', () => {
    // Carousel functionality
    const carousel = document.getElementById('carousel');
    let currentIndex = 0;

    function moveCarousel() {
        currentIndex = (currentIndex + 1) % carousel.children.length;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(moveCarousel, 5000);

    // Font size adjustment
    function setFontSize(size) {
        document.body.classList.remove('small', 'normal', 'large');
        document.body.classList.add(size);
    }

    // Set initial font size and dark mode state
    setFontSize('normal');
    if (document.body.classList.contains('dark-mode')) {
        toggleModeButton.textContent = 'Dark Mode';
    } else {
        toggleModeButton.textContent = 'Light Mode';
    }
});

function searchItems() {
    const input = document.getElementById('search-input');
    const filter = input.value.toLowerCase();
    const ul = document.getElementById('search-results');
    const li = ul.getElementsByTagName('li');

    for (let i = 0; i < li.length; i++) {
        const a = li[i].getElementsByTagName('a')[0];
        if (a.innerHTML.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}
