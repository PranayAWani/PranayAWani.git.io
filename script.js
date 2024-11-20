// Select the container element
const container = document.querySelector('.container');

// Scroll left function
function scrollLeft() {
    container.scrollBy({
        right: 300, // Adjust scroll distance as needed
        behavior: 'smooth',
    });
}

// Scroll right function
function scrollRight() {
    container.scrollBy({
        left: 300, // Adjust scroll distance as needed
        behavior: 'smooth',
    });
}


document.getElementById('login-button').addEventListener('click', () => {
    const loginButton = document.getElementById('login-button');
    if (loginButton.textContent === 'Login') {
        loginButton.textContent = 'Logout';
        alert('Logged in!');
    } else {
        loginButton.textContent = 'Login';
        alert('Logged out!');
        window.location.href = 'home.html';
    }
});
