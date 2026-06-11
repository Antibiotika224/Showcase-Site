// Animated Starfield with Parallax Scrolling
class Starfield {
  constructor() {
    this.container = document.getElementById('starfield');
    this.stars = [];
    this.numStars = 150;
    this.init();
  }

  init() {
    this.createStars();
    this.setupParallax();
  }

  createStars() {
    for (let i = 0; i < this.numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size (1-4px)
      const size = Math.random() * 3 + 1;
      
      // Random animation delay
      const delay = Math.random() * 5;
      
      // Parallax depth (0.1 to 1.0)
      const depth = Math.random() * 0.9 + 0.1;
      
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${delay}s`;
      star.dataset.depth = depth;
      
      this.container.appendChild(star);
      this.stars.push(star);
    }
  }

  setupParallax() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      this.stars.forEach(star => {
        const depth = parseFloat(star.dataset.depth);
        const yPos = -(scrolled * depth * 0.5);
        star.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
}

// Initialize starfield when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Starfield();
});
