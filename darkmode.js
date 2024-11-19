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