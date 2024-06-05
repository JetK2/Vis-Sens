// Event listener waits for the HTML page to load before executing code
document.addEventListener('DOMContentLoaded', () => {
    // grabs html elements
    const logo = document.querySelector('.logo');
    const aboutContainer = document.querySelector('.about-container');
    // trigger position for animation
    const revealThreshold = 100;
    
// Scroll Animation to hide and reveal about description 
// Waits for scroll to be triggered
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const revealOpacity = 1;
        // When the scroll position goes past the trigger it reveals the description
        if (scrollPosition > revealThreshold) {
            aboutContainer.style.opacity = revealOpacity;
            
        } else {
            aboutContainer.style.opacity = 0;
        }
    });

// Scroll Animation to slide image to the left 

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
 // When the scroll position goes past the trigger it slides image
        if (scrollPosition > revealThreshold) {
            logo.style.transform = 'translateX(-300%)';
        } else {
            logo.style.transform = 'none';
        }
    });
});
