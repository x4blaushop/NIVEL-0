const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
let w, h, particles = [];
const dnaChars = "017A8B9C".split(""); 

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    
    // 1500 partículas para manter a densidade da pele do DNA
    for(let i = 0; i < 1500; i++) { 
        particles.push({
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            speed: 0.003 + Math.random() * 0.002,
            size: Math.random() * 12 + 8,
            c: dnaChars[Math.floor(Math.random() * dnaChars.length)]
        });
    }
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, w, h);
    
    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 2.5; 
        
        if(p.r < 40) {
            p.r = Math.max(w, h) * 0.95;
        }

        const x = w / 2 + Math.cos(p.angle) * p.r;
        const y = h / 2 + Math.sin(p.angle) * p.r;

        ctx.fillStyle = "#62ff8a";
        ctx.font = p.size + "px monospace";
        ctx.fillText(p.c, x, y);
    });

    // Centro do Portal
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 50, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.strokeStyle = "#62ff8a";
    ctx.stroke();

    requestAnimationFrame(draw);
}

window.addEventListener("resize", init);
init();
draw();
