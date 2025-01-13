document.addEventListener('DOMContentLoaded', () => {
    const memberCards = document.querySelectorAll('.member-card');
    const hoverSound = new Audio('hover-sound.mp3'); // Replace with your sound file

    memberCards.forEach(card => {
        card.addEventListener('mouseenter', () => hoverSound.play());
    });
});
