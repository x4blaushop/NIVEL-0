const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
let w, h, particles = [];
// Caracteres do DNA Matrix (Identidade Preservada)
const dnaChars = "017A8B9C$#@!".split(""); 

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    
    // Densidade total de 1500 partículas para impacto máximo
    const count = 1500;

    for(let i = 0; i < count; i++) { 
        particles.push({
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            speed: 0.003 + Math.random() * 0.003,
            size: Math.random() * (w < 600 ? 10 : 16) + 7,
            c: dnaChars[Math.floor(Math.random() * dnaChars.length)]
        });
    }
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    ctx.fillRect(0, 0, w, h);
    
    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 2.8; 
        
        if(p.r < 40) {
            p.r = Math.max(w, h) * 0.9;
        }

        const x = w / 2 + Math.cos(p.angle) * p.r;
        const y = h / 2 + Math.sin(p.angle) * p.r;

        ctx.fillStyle = "#62ff8a";
        ctx.font = p.size + "px monospace";
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#62ff8a";
        ctx.fillText(p.c, x, y);
    });

    // Horizonte de Eventos Central
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 55, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.stroke();

    requestAnimationFrame(draw);
}

window.addEventListener("resize", init);
init();
draw();
