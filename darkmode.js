// document.getElementById('toggle-mode').addEventListener('click', () => {
//     const toggleButton = document.getElementById('toggle-mode');
//     if (document.body.dataset.theme === 'dark') {
//         document.body.dataset.theme = 'light';
//         toggleButton.textContent = 'Dark Mode';
//     } else {
//         document.body.dataset.theme = 'dark';
//         toggleButton.textContent = 'Light Mode';
//     }
// });
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-mode');

    // Function to set the theme
    const setTheme = (theme) => {
        document.body.dataset.theme = theme;
        toggleButton.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
        localStorage.setItem('theme', theme);
    };

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Add event listener to the toggle button
    toggleButton.addEventListener('click', () => {
        const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
});
