document.getElementById('toggle-mode').addEventListener('click', () => {
    const toggleButton = document.getElementById('toggle-mode');
    if (document.body.dataset.theme === 'dark') {
        document.body.dataset.theme = 'light';
        toggleButton.textContent = 'Dark Mode';
    } else {
        document.body.dataset.theme = 'dark';
        toggleButton.textContent = 'Light Mode';
    }
});

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
