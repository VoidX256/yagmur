class Firework {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = canvasHeight;
        this.sx = this.x;
        this.sy = this.y;
        this.tx = Math.random() * canvasWidth;
        this.ty = Math.random() * canvasHeight/2;
        
        this.distanceToTarget = Math.sqrt(Math.pow(this.tx - this.sx, 2) + Math.pow(this.ty - this.sy, 2));
        this.distanceTraveled = 0;
        this.angle = Math.atan2(this.ty - this.sy, this.tx - this.sx);
        this.speed = 15;
        this.acceleration = 1.05;
        this.brightness = Math.random() * 50 + 50;
        this.targetRadius = 1;
        this.particles = [];
        this.hue = Math.floor(Math.random() * 360);
    }

    update() {
        this.x = this.sx + Math.cos(this.angle) * this.distanceTraveled;
        this.y = this.sy + Math.sin(this.angle) * this.distanceTraveled;
        this.distanceTraveled += this.speed;
        
        if (this.distanceTraveled >= this.distanceToTarget) {
            return this.explode();
        }
        
        this.speed *= this.acceleration;
        return true;
    }

    explode() {
        for (let i = 0; i < 70; i++) {
            this.particles.push(new Particle(
                this.x,
                this.y,
                this.hue,
                this.brightness
            ));
        }
        return false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.targetRadius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
        ctx.fill();
    }
}

class Particle {
    constructor(x, y, hue, brightness) {
        this.x = x;
        this.y = y;
        this.hue = hue;
        this.brightness = brightness;
        this.decay = 0.015;
        this.life = 1;
        
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.cos(Math.random() * Math.PI / 2) * 15;
        this.friction = 0.95;
        this.gravity = 0.5;
        
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        
        this.vx *= this.friction;
        this.vy *= this.friction;
        
        this.life -= this.decay;
        return this.life > 0;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.life})`;
        ctx.fill();
    }
}

// Canvas setup
const fireworksCanvas = document.createElement('canvas');
fireworksCanvas.id = 'fireworksCanvas';
document.body.insertBefore(fireworksCanvas, document.body.firstChild);

const ctx = fireworksCanvas.getContext('2d');
let fireworks = [];
let particles = [];

function resizeCanvas() {
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Animation
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    // Random firework creation
    if (Math.random() < 0.05) { // Adjust this value to control frequency
        fireworks.push(new Firework(fireworksCanvas.width, fireworksCanvas.height));
    }

    // Update and draw fireworks
    fireworks = fireworks.filter(firework => {
        firework.draw(ctx);
        return firework.update();
    });

    // Update and draw particles
    particles = particles.concat(fireworks.reduce((acc, firework) => acc.concat(firework.particles), []));
    fireworks.forEach(firework => firework.particles = []);

    particles = particles.filter(particle => {
        particle.draw(ctx);
        return particle.update();
    });

    requestAnimationFrame(animate);
}

animate();
