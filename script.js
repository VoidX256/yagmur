const canvas = document.getElementById('fallingHearts');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

class Heart {
    constructor(x, y, targetX, targetY, color) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.color = color;
        this.size = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.gravity = 0.1;
        this.life = 1;
        this.decay = 0.015;
    }

    update() {
        if (this.targetX) {
            // Kalp şeklini oluşturmak için hedef noktaya hareket
            let dx = this.targetX - this.x;
            let dy = this.targetY - this.y;
            this.x += dx * 0.05;
            this.y += dy * 0.05;
        } else {
            // Saçılma efekti için
            this.speedY += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY;
        }
        this.life -= this.decay;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + Math.floor(this.life * 255).toString(16).padStart(2, '0');
        ctx.fill();
    }
}

function createHearts(x, y) {
    // Daha fazla kalp oluştur
    for (let i = 0; i < 20; i++) {
        hearts.push(new Heart(x, y));
    }
}

function createBurstEffect(x, y) {
    for (let i = 0; i < 50; i++) {
        const particle = new Particle(
            x,
            y,
            null,
            null,
            colors[Math.floor(Math.random() * colors.length)]
        );
        particles.push(particle);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    hearts = hearts.filter(heart => {
        if (heart.update()) {
            heart.draw();
            return true;
        }
        return false;
    });
    
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.addEventListener('DOMContentLoaded', () => {
    const heart = document.querySelector('.heart');
    const canvas = document.getElementById('fallingHearts');
    const surpriseButton = document.querySelector('.surprise-button');

    // Heart click event
    heart.addEventListener('click', (e) => {
        const rect = heart.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createHearts(x, y);
    });

    // Surprise button click event
    surpriseButton.addEventListener('click', () => {
        const modal = document.getElementById('videoModal');
        const video = document.getElementById('surpriseVideo');
        modal.style.display = "block";
        video.play();
    });

    // Close button click event
    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        const modal = document.getElementById('videoModal');
        const video = document.getElementById('surpriseVideo');
        modal.style.display = "none";
        video.pause();
        video.currentTime = 0;
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('videoModal');
        if (event.target === modal) {
            const video = document.getElementById('surpriseVideo');
            modal.style.display = "none";
            video.pause();
            video.currentTime = 0;
        }
    });
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let hearts = [];

    class FallingHeart {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 15 + 10;
            this.speedY = Math.random() * 4 + 2;
            this.speedX = (Math.random() - 0.5) * 3;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.2;
            this.gravity = 0.2;
            this.opacity = 1;
            this.color = `rgba(255, ${Math.random() * 50 + 50}, ${Math.random() * 50 + 50}, 1)`;
        }

        update() {
            this.speedY += this.gravity;
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            this.opacity -= 0.005;

            return this.y < canvas.height && this.opacity > 0;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            ctx.beginPath();
            ctx.globalAlpha = this.opacity;
            const topCurveHeight = this.size * 0.3;
            
            // Sol yarım kalp
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(
                -this.size / 2, -topCurveHeight,
                -this.size / 2, 0
            );
            ctx.quadraticCurveTo(
                -this.size / 2, this.size / 2,
                0, this.size
            );
            
            // Sağ yarım kalp
            ctx.quadraticCurveTo(
                this.size / 2, this.size / 2,
                this.size / 2, 0
            );
            ctx.quadraticCurveTo(
                this.size / 2, -topCurveHeight,
                0, 0
            );
            
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    function createHearts(x, y) {
        for (let i = 0; i < 30; i++) {
            hearts.push(new FallingHeart(x, y));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        hearts = hearts.filter(heart => {
            const alive = heart.update();
            heart.draw();
            return alive;
        });
        
        requestAnimationFrame(animate);
    }

    // Ana kalbe tıklama olayını ekle
    mainHeart.addEventListener('click', (e) => {
        const rect = mainHeart.getBoundingClientRect();
        createHearts(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
        );
    });

    // Animasyonu başlat
    animate();

    // Video modal kontrolü
    surpriseBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        // Video elementini oluştur (video ekleyeceğiniz zaman buraya ekleyeceksiniz)
        videoContainer.innerHTML = '<p style="color: white; text-align: center;">Buraya video eklenecek</p>';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        videoContainer.innerHTML = ''; // Videoyu temizle
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            videoContainer.innerHTML = ''; // Videoyu temizle
        }
    });
});
