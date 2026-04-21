const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find the hero section boundaries
const heroStyleStart = html.indexOf('/* Robot Wrapper for Splitting */');
const heroEnd = html.indexOf('</div>\r\n\r\n    <!-- WHY US');
if (heroEnd === -1) {
    // Try with \n only
    const alt = html.indexOf('</div>\n\n    <!-- WHY US');
    if (alt === -1) {
        console.log('ERROR: Could not find hero end marker');
        // Try another approach - find closing </div> before the WHY US section
        const whyUsIdx = html.indexOf('<!-- WHY US');
        if (whyUsIdx === -1) {
            console.log('ERROR: Could not find WHY US marker either');
            process.exit(1);
        }
        // Go backwards to find the </div> before it
        const lastDiv = html.lastIndexOf('</div>', whyUsIdx);
        console.log('Found </div> at', lastDiv, 'WHY US at', whyUsIdx);
    }
}

// Strategy: Replace everthing between <style> content and <!-- WHY US
const styleStart = html.indexOf('    <style>');
const whyUsStart = html.indexOf('<!-- WHY US');

if (styleStart === -1 || whyUsStart === -1) {
    console.log('ERROR: markers not found. style:', styleStart, 'whyUs:', whyUsStart);
    process.exit(1);
}

// Find the line before <!-- WHY US that has proper whitespace
// We want to replace from after <style>\n to just before <!-- WHY US
const newHeroBlock = `    <style>
        .hero {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
            background: #fff;
        }

        .robot-activation-area {
            position: relative;
            width: 100%;
            max-width: 1000px;
            height: 90vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: -100px;
        }

        #core-canvas {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 5;
            pointer-events: none;
            opacity: 0;
            transform: scale(0.5);
            filter: blur(10px);
        }

        .robot-panel {
            position: absolute;
            top: 5%;
            width: 50%;
            height: 90%;
            background-image: url('assets/robot.png');
            background-size: 200% 100%;
            background-repeat: no-repeat;
            z-index: 10;
            transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
            mask-image: radial-gradient(ellipse at center, black 70%, transparent 95%);
            -webkit-mask-image: radial-gradient(ellipse at center, black 70%, transparent 95%);
        }

        .panel-left { left: 0; background-position: left center; }
        .panel-right { right: 0; background-position: right center; }

        .energy-ripple {
            position: absolute;
            width: 10px; height: 10px;
            border-radius: 50%;
            border: 2px solid var(--gold);
            z-index: 4;
            opacity: 0;
            pointer-events: none;
        }

        .vignette-overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: radial-gradient(circle, transparent 50%, rgba(255,255,255,0.9) 100%);
            z-index: 20; pointer-events: none;
        }

        .cards-float-container {
            position: absolute; width: 100%; height: 100%;
            z-index: 25; pointer-events: none;
        }

        .floating-ui-card {
            position: absolute; width: 240px;
            opacity: 0; transform: translateY(50px);
        }

        #neural-canvas-global {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            opacity: 0.05; z-index: 1;
        }

        .orbit-node {
            position: absolute; display: flex; flex-direction: column;
            align-items: center; gap: 0.4rem; text-decoration: none;
            z-index: 25; pointer-events: auto; transition: transform 0.3s ease; opacity: 0;
        }
        .orbit-node:hover { transform: scale(1.15) !important; }
        .orbit-icon {
            width: 52px; height: 52px; border-radius: 50%;
            background: #fff; border: 2px solid #d4af37;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.4rem; box-shadow: 0 4px 20px rgba(212,175,55,0.3);
            transition: background 0.3s, border-color 0.3s;
        }
        .orbit-node:hover .orbit-icon { background: #d4af37; border-color: #111; }
        .orbit-label {
            font-size: 0.65rem; font-weight: 700; letter-spacing: 1.5px;
            text-transform: uppercase; color: #111; white-space: nowrap;
        }

        @keyframes spinText { to { transform: rotate(360deg); } }

        @media (max-width: 768px) {
            .cards-float-container { display: none; }
            .orbit-node { display: none; }
            .robot-activation-area { max-width: 400px; height: 60vh; }
        }
    </style>
</head>
<body>
    <nav>
        <a href="index.html" class="logo">
            <img src="assets/logo.png" alt="">
            <span>A AI</span>
        </a>
        <button class="menu-toggle" aria-label="Toggle navigation">☰</button>
        <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="solutions.html">Solutions</a>
            <a href="tech.html">The Tech</a>
            <a href="blogs.html">Blogs</a>
            <a href="careers.html">Careers</a>
            <a href="contact.html">Contact</a>
        </div>
    </nav>

    <div class="hero">
        <canvas id="neural-canvas-global"></canvas>
        <div class="vignette-overlay"></div>

        <div class="robot-activation-area">
            <canvas id="core-canvas"></canvas>
            <div class="robot-panel panel-left" id="p-left"></div>
            <div class="robot-panel panel-right" id="p-right"></div>
            <div class="energy-ripple" id="ripple"></div>

            <!-- अ + Spinning ring overlay -->
            <div id="circle-badge" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 260px; height: 260px; display: flex; align-items: center; justify-content: center; z-index: 20; opacity: 0; pointer-events: none;">
                <svg viewBox="0 0 200 200" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; animation: spinText 14s linear infinite;">
                    <defs><path id="circleOrbit" d="M 100,100 m -86,0 a 86,86 0 1,1 172,0 a 86,86 0 1,1 -172,0" /></defs>
                    <text font-size="10.5" font-family="'Inter', sans-serif" font-weight="700" letter-spacing="3" fill="#000000">
                        <textPath href="#circleOrbit">INNOVATION \\u2022 RESEARCH \\u2022 DEVELOPMENT \\u2022 </textPath>
                    </text>
                </svg>
                <span style="font-family: 'Outfit', sans-serif; font-size: 5.5rem; font-weight: 700; color: #000; text-shadow: 0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.2); position: relative; z-index: 2; line-height: 1;">\\u0905</span>
            </div>

            <!-- Orbital nav nodes -->
            <a href="solutions.html" class="orbit-node" style="top: calc(50% - 230px); left: 50%; transform: translate(-50%, 0);">
                <div class="orbit-icon">\\u26A1</div><span class="orbit-label">Solutions</span>
            </a>
            <a href="tech.html" class="orbit-node" style="top: 50%; left: calc(50% + 230px); transform: translate(0, -50%);">
                <div class="orbit-icon">\\uD83D\\uDD2C</div><span class="orbit-label">The Tech</span>
            </a>
            <a href="blogs.html" class="orbit-node" style="top: calc(50% + 160px); left: calc(50% + 160px);">
                <div class="orbit-icon">\\uD83D\\uDCDD</div><span class="orbit-label">Blogs</span>
            </a>
            <a href="careers.html" class="orbit-node" style="top: calc(50% + 160px); left: calc(50% - 210px);">
                <div class="orbit-icon">\\uD83D\\uDE80</div><span class="orbit-label">Careers</span>
            </a>
            <a href="contact.html" class="orbit-node" style="top: 50%; left: calc(50% - 270px); transform: translate(0, -50%);">
                <div class="orbit-icon">\\u2709\\uFE0F</div><span class="orbit-label">Contact</span>
            </a>
        </div>

        <div style="position: absolute; bottom: 8%; left: 0; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; z-index: 15; pointer-events: none;">
            <p class="tagline" style="opacity: 0; letter-spacing: 8px; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; color: #555; margin-bottom: 1.5rem;">A AI &mdash; Answer is Yes!</p>
            <div class="cta-reveal" style="opacity: 0; pointer-events: auto;">
                <a href="#about-us" class="btn-gold">Explore the Future</a>
            </div>
        </div>

        <div class="cards-float-container">
            <div class="floating-ui-card glass-card" style="top: 20%; left: 10%;" id="card-1">
                <div style="color: var(--gold); margin-bottom: 0.5rem;">\\u25CF AI CHAT INTERFACE</div>
                <p style="font-size: 0.8rem;">Ready for synthesis...</p>
            </div>
            <div class="floating-ui-card glass-card" style="top: 25%; right: 10%;" id="card-2">
                <div style="color: var(--gold); margin-bottom: 0.5rem;">\\u25C6 ANALYTICS CORE</div>
                <p style="font-size: 0.8rem;">Data points synchronized.</p>
            </div>
            <div class="floating-ui-card glass-card" style="bottom: 20%; left: 12%;" id="card-3">
                <div style="color: var(--gold); margin-bottom: 0.5rem;">\\u25A3 AUTOMATION GRID</div>
                <p style="font-size: 0.8rem;">Flow optimized.</p>
            </div>
        </div>
    </div>

    `;

// Now replace: everything from <style> to just before <!-- WHY US
html = html.substring(0, styleStart) + newHeroBlock + html.substring(whyUsStart);

fs.writeFileSync('index.html', html);
console.log('SUCCESS: Hero section rebuilt with अ character, spinning ring, and orbital navigation.');
