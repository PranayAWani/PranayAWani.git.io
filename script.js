

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
