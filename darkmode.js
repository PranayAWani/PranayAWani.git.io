function setFontSize(size) {
    document.body.classList.remove('normal-font', 'large-font', 'small-font');
    document.body.classList.add(size + '-font');
}

// Set default font size on page load
document.addEventListener('DOMContentLoaded', () => {
    setFontSize('normal');
});
