// Function to create random particles in the background
function createParticles() {
    const particleContainer = document.body;
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 5 + 3; // Random size between 3px and 8px
        const delay = Math.random() * 2 + 's';
        const duration = Math.random() * 3 + 2 + 's';
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = duration;
        particle.style.animationDelay = delay;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.left = `${Math.random() * 100}vw`;
        
        particleContainer.appendChild(particle);
    }
}

createParticles(); // Generate particles on page load
