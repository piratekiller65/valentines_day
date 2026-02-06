// --- 1. GLITTER CANVAS ---
const canvas = document.getElementById('glitterCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.4 + 0.1;
        this.opacity = Math.random();
    }
    update() {
        this.y -= this.speedY;
        if (this.y < 0) this.reset();
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();

// --- 2. NAVIGATION ---
let currentIndex = 0;
const container = document.getElementById('pagesContainer');
const pages = document.querySelectorAll('.page');
const totalStoryPages = 10; // Number of story pages
const valentineOverlay = document.getElementById('valentineOverlay');
const storySection = document.getElementById('storySection');

function changePage(dir) {
    currentIndex += dir;

    // Handle boundaries
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > totalStoryPages) currentIndex = totalStoryPages;

    // Update display
    if (currentIndex < totalStoryPages) {
        // Show story pages
        storySection.style.display = 'block';
        valentineOverlay.classList.add('hidden-overlay');
        container.style.transform = `translateX(-${currentIndex * 100}vw)`;
        document.getElementById('currentNum').innerText = currentIndex + 1;
    } else {
        // Show Valentine question (page 11)
        storySection.style.display = 'none';
        valentineOverlay.classList.remove('hidden-overlay');
        valentineOverlay.style.display = 'flex';
        valentineOverlay.style.alignItems = 'center';
        valentineOverlay.style.justifyContent = 'center';
        valentineOverlay.style.height = '100vh';
        document.getElementById('currentNum').innerText = 11;
    }
}

// --- 3. THE NO BUTTON (CONTAINED WITHIN CARD) ---
const noBtn = document.getElementById('noBtn');

noBtn.addEventListener('mouseover', () => {
    noBtn.innerText = "🐾🐈";

    // Get the button group container (parent element)
    const btnGroup = noBtn.parentElement;
    const groupRect = btnGroup.getBoundingClientRect();

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate safe bounds within the button group area
    const buffer = 10;
    const minX = buffer;
    const minY = buffer;
    const maxX = groupRect.width - btnWidth - buffer;
    const maxY = groupRect.height - btnHeight - buffer;

    // Generate random position within the button group
    let randomX = Math.random() * (maxX - minX) + minX;
    let randomY = Math.random() * (maxY - minY) + minY;

    // Apply absolute position (relative to button group which has position: relative)
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.margin = '0';
    noBtn.style.zIndex = '100000';
});

// Add click handler to show angry cat
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showAngryCat();
});

function showAngryCat() {
    const modal = document.getElementById('angryCatModal');
    modal.classList.remove('hidden-overlay');
}

function closeAngryCat() {
    const modal = document.getElementById('angryCatModal');
    modal.classList.add('hidden-overlay');
}

function celebrate() {
    const modal = document.getElementById('celebrationModal');
    modal.classList.remove('hidden-overlay');
    createFireworks();
}

function createFireworks() {
    const container = document.getElementById('fireworksContainer');
    container.innerHTML = ''; // Clear previous fireworks

    // Create multiple fireworks bursts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = (Math.random() * 50 + 10) + '%';

            // Create particles for each firework
            for (let j = 0; j < 30; j++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';

                const angle = (Math.PI * 2 * j) / 30;
                const velocity = 100 + Math.random() * 50;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;

                particle.style.setProperty('--tx', tx + 'px');
                particle.style.setProperty('--ty', ty + 'px');

                // Random colors
                const colors = ['#ff6b9d', '#ffd700', '#ff1493', '#00ff00', '#00bfff', '#ff69b4'];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];

                firework.appendChild(particle);
            }

            container.appendChild(firework);

            // Remove after animation
            setTimeout(() => firework.remove(), 2000);
        }, i * 300);
    }
}

// --- 4. FLOATING HEARTS DECORATION ---
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['💕', '💖', '💗', '💓', '💝', '🌸', '🐾'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 15 + 20) + 'px';
        container.appendChild(heart);

        // Remove after animation
        setTimeout(() => heart.remove(), 8000);
    }, 800);
}

// Start floating hearts
createFloatingHearts();

// --- 5. MUSIC TOGGLE ---
let isPlaying = false;

function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggle');

    if (isPlaying) {
        music.pause();
        btn.classList.remove('playing');
        btn.textContent = '🎵';
    } else {
        music.play().catch(e => console.log('Audio play failed:', e));
        btn.classList.add('playing');
        btn.textContent = '🎶';
    }
    isPlaying = !isPlaying;
}