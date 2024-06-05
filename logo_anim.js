document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    const textContainer = document.querySelector('.text-container');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Adjust these values based on when you want the effect to trigger
        const revealThreshold = 100;
        const revealOpacity = 1;

        if (scrollPosition > revealThreshold) {
            textContainer.style.opacity = revealOpacity;
            console.log('hi')
        } else {
            textContainer.style.opacity = 0;
        }
    });

    // Animation for logo
    const revealThreshold = 100; // Adjust threshold if needed

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition > revealThreshold) {
            logo.style.transform = 'translateX(-300%)';
        } else {
            logo.style.transform = 'none';
        }
    });
});
