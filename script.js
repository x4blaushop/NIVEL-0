const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
let w, h, particles = [];
const dnaChars = "01X4DNA".split(""); 

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    
    const count = Math.floor((w * h) / 1200);
    const finalCount = Math.min(Math.max(count, 600), 1600);

    for(let i = 0; i < finalCount; i++) { 
        particles.push({
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            speed: 0.003 + Math.random() * 0.003,
            size: Math.random() * 12 + 8,
            c: dnaChars[Math.floor(Math.random() * dnaChars.length)]
        });
    }
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, w, h);
    
    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 2.5; 
        
        if(p.r < 40) {
            p.r = Math.max(w, h) * 0.9;
        }

        const x = w / 2 + Math.cos(p.angle) * p.r;
        const y = h / 2 + Math.sin(p.angle) * p.r;

        ctx.fillStyle = "#62ff8a";
        ctx.font = p.size + "px monospace";
        ctx.fillText(p.c, x, y);
    });

    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 50, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.stroke();

    requestAnimationFrame(draw);
}

window.addEventListener("resize", init);
init();
draw();
