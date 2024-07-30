document.addEventListener('DOMContentLoaded', () => {
    // Function to update time
    function updateTime() {
        const timeElement = document.getElementById('time');
        if (timeElement) {
            const currentTime = new Date().toLocaleTimeString();
            timeElement.textContent = `Current Time: ${currentTime}`;
        }
    }

    // Update time every second
    setInterval(updateTime, 1000);
    updateTime();

    // Particle animation
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particlesArray = [];
        const maxParticles = 100;
        let speedMultiplier = 1;

        class Particle {
            constructor(x, y) {
                this.x = x || Math.random() * canvas.width;
                this.y = y || Math.random() * canvas.height;
                this.size = 2;
                this.speedX = (Math.random() * 0.5 - 0.25) * speedMultiplier;
                this.speedY = (Math.random() * 0.5 - 0.25) * speedMultiplier;
                this.opacity = 1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }

        function connectParticles() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a + 1; b < particlesArray.length; b++) {
                    let distance = Math.sqrt(
                        (particlesArray[a].x - particlesArray[b].x) ** 2 +
                        (particlesArray[a].y - particlesArray[b].y) ** 2
                    );
                    if (distance < 100) {
                        opacityValue = 1 - distance / 100;
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }

        function initParticles() {
            particlesArray.length = 0;
            for (let i = 0; i < maxParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            connectParticles();
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        // Speed slider event listener
        const speedSlider = document.getElementById('speedSlider');
        if (speedSlider) {
            speedSlider.addEventListener('input', function () {
                speedMultiplier = this.value;
                particlesArray.forEach(particle => {
                    particle.speedX = (Math.random() * 0.5 - 0.25) * speedMultiplier;
                    particle.speedY = (Math.random() * 0.5 - 0.25) * speedMultiplier;
                });
            });
        }

        initParticles();
        animate();
    }

    // Convert video links to playable videos
    const videoLinks = document.querySelectorAll('.video-link');
    videoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const videoUrl = link.getAttribute('data-video-url');
            const existingVideo = link.parentElement.querySelector('video');
            if (!existingVideo) {
                const videoContainer = document.createElement('div');
                videoContainer.className = 'video-container';
                const videoElement = document.createElement('video');
                videoElement.controls = true;
                videoElement.width = 640;
                videoElement.height = 360;
                videoElement.src = videoUrl;
                videoContainer.appendChild(videoElement);
                link.parentElement.appendChild(videoContainer);
                videoElement.play();
            }
        });
    });

    // Add fade-out transition on navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetUrl = this.href;
            document.body.classList.remove('loaded'); // Start fade-out
            setTimeout(() => {
                window.location.href = targetUrl; // Navigate after fade-out
            }, 500); // Duration of the fade-out effect
        });
    });

    // Apply loaded class to trigger fade-in effect
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});
