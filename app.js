import * as THREE from 'three';
import { gsap } from 'gsap';


window.addEventListener('load', () => {
    console.log("DOM and Assets Loaded. Initializing...");
    
    if (typeof THREE === 'undefined') {
        console.error("Three.js not found! Check your internet connection.");
        return;
    }

    initGlobalNeuralBg();
    
    if (document.getElementById('core-canvas')) {
        initAICore();
        // Start after a shorter delay to feel more responsive
        setTimeout(() => {
            console.log("Starting Activation Sequence...");
            startCoreActivationSequence();
        }, 1000);
    }
    initSharedInteractions();
});

// Initialize mobile nav immediately to avoid waiting for heavy images
initMobileNav();

// Mobile Navbar Toggle
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
}

// 1. Three.js Living AI Core
function initAICore() {
    const canvas = document.getElementById('core-canvas');
    if (!canvas) return;

    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(600, 600);

        // Core Sphere
        const sphereGeo = new THREE.SphereGeometry(1.2, 64, 64);
        const sphereMat = new THREE.MeshPhongMaterial({
            color: '#ffffff',
            emissive: '#d4af37',
            emissiveIntensity: 2,
            transparent: true,
            opacity: 0.8
        });
        const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
        scene.add(coreSphere);

        // Energy Rings
        const rings = [];
        const ringMat = new THREE.MeshBasicMaterial({ color: '#d4af37', side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
        
        for(let i=0; i<3; i++) {
            const ringGeo = new THREE.TorusGeometry(1.5 + (i*0.4), 0.02, 16, 100);
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = Math.random() * Math.PI;
            ring.rotation.y = Math.random() * Math.PI;
            scene.add(ring);
            rings.push(ring);
        }

        // Lights
        const pLight = new THREE.PointLight(0xd4af37, 10, 10);
        pLight.position.set(0, 0, 0);
        scene.add(pLight);

        camera.position.z = 4;

        function animate() {
            requestAnimationFrame(animate);
            coreSphere.rotation.y += 0.01;
            
            rings.forEach((r, idx) => {
                r.rotation.y += 0.01 * (idx + 1);
                r.rotation.x += 0.005;
            });

            // Pulsate Core
            const scale = 1 + Math.sin(Date.now() * 0.005) * 0.05;
            coreSphere.scale.set(scale, scale, scale);

            renderer.render(scene, camera);
        }
        animate();
        
        window.coreGroup = { coreSphere, rings, pLight, canvas };
        console.log("AI Core Initialized.");
    } catch (e) {
        console.error("Three.js Error:", e);
    }
}

// 2. Cinematic Activation Sequence
function startCoreActivationSequence() {
    if (!window.coreGroup) {
        console.error("Cannot start activation: Core not ready.");
        return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });
    const pLeft = document.getElementById('p-left');
    const pRight = document.getElementById('p-right');
    const core = window.coreGroup.canvas;
    const ripple = document.getElementById('ripple');

    // Phase 1: Warming Up
    tl.to(core, { opacity: 0.3, filter: "blur(5px)", duration: 1 });

    // Phase 2: Mechanical Opening
    tl.to(pLeft, { x: "-200px", rotateY: -15, duration: 2.5 }, 0.5);
    tl.to(pRight, { x: "200px", rotateY: 15, duration: 2.5 }, 0.5);

    // Phase 3: Core Ignite
    tl.to(core, { 
        opacity: 1, 
        filter: "blur(0px)", 
        scale: 1, 
        duration: 1.5, 
        ease: "expo.out" 
    }, "-=1.5");

    // Phase 4: Energy Ripple Blast
    tl.to(ripple, {
        opacity: 1,
        width: "200vw",
        height: "200vw",
        borderWidth: "0px",
        duration: 2.5,
        ease: "power2.out"
    }, "-=0.5");

    // Phase 5: Holographic UI Reveal
    tl.to(".reveal-text", { opacity: 1, y: 0, duration: 1.5 }, "-=1.5");
    tl.to(".tagline", { opacity: 1, duration: 1 }, "-=1");
    tl.to(".answer-yes", { opacity: 1, duration: 1.2, scale: 1.1, yoyo: true, repeat: 1, ease: "sine.inOut" }, "-=0.8");
    tl.to(".cta-reveal", { opacity: 1, y: 0, duration: 0.8 }, "-=0.5");

    // Step 6: Floating Cards Reveal
    tl.to(".floating-ui-card", {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "back.out(1.7)"
    }, "-=1");
    
    console.log("Activation Sequence Complete.");
}

// Global Three.js Background
function initGlobalNeuralBg() {
    const canvas = document.getElementById('neural-canvas-global');
    if (!canvas) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const geometry = new THREE.BufferGeometry();
    const pos = new Float32Array(1000 * 3);
    for(let i=0; i<3000; i++) pos[i] = (Math.random() - 0.5) * 20;
    geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const points = new THREE.Points(geometry, new THREE.PointsMaterial({ color: '#d4af37', size: 0.01 }));
    scene.add(points);
    camera.position.z = 5;
    function animate() {
        requestAnimationFrame(animate);
        points.rotation.y += 0.0002;
        renderer.render(scene, camera);
    }
    animate();
}

function initSharedInteractions() {
    // Smooth scroll and hover effects for buttons
    document.querySelectorAll('.btn-gold').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            gsap.to(btn, { transform: `scale(1.05) translate(${(x - rect.width/2)/10}px, ${(y - rect.height/2)/10}px)`, duration: 0.3 });
        });
        btn.addEventListener('mouseleave', () => gsap.to(btn, { transform: 'scale(1) translate(0,0)', duration: 0.3 }));
    });
}
