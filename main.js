// Wait for DOM and Libraries
window.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initHeroAnimation();
});

// Three.js Particle System
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: '#d4af37',
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    });

    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        // Smooth follow mouse
        particlesMesh.position.x += (mouseX - particlesMesh.position.x) * 0.05;
        particlesMesh.position.y += (-mouseY - particlesMesh.position.y) * 0.05;

        renderer.render(scene, camera);
    }

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Share reference for GSAP
    window.particlesMesh = particlesMesh;
}

// GSAP Hero Animation Logic
function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Initial State
    gsap.set(".robot-wrapper", { perspective: 1000 });
    
    // 2. The Gold Scan
    tl.to(".scan-line", {
        left: "100%",
        duration: 2.5,
        ease: "power2.inOut"
    });

    // 3. Neural Network Fade In
    tl.to(".neural-bg", {
        opacity: 1,
        duration: 3
    }, "-=1.5");

    // 4. Particle Assembly (Simplified visual: tighten points)
    tl.to(window.particlesMesh.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        duration: 2,
        ease: "expo.out"
    }, "-=2");

    // 5. Robot Reveal
    tl.to("#robot-main", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 2.5,
        ease: "expo.out"
    }, "-=1");

    // 6. Activation Ripple
    tl.fromTo(".ripple", 
        { width: 0, height: 0, opacity: 0.8 },
        { width: 500, height: 500, opacity: 0, duration: 2, ease: "power2.out" },
        "-=1.5"
    );

    // 7. Hero Text Reveal
    tl.to(".content", {
        opacity: 1,
        y: 0,
        duration: 1.5
    }, "-=1");

    // 8. Cards Stagger
    tl.to(".card", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2
    }, "-=0.8");

    // 9. CTA Reveal
    tl.to(".cta-wrapper", {
        opacity: 1,
        duration: 1
    }, "-=0.5");

    // Floating Animations (Infinite)
    gsap.to("#robot-main", {
        y: "-=15",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".card", {
        y: "-=8",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
            each: 0.5,
            from: "random"
        }
    });

    // Subtle Rotate Robot on Mouse
    window.addEventListener('mousemove', (e) => {
        const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;
        
        gsap.to("#robot-main", {
            rotationY: xPercent * 10,
            rotationX: -yPercent * 10,
            duration: 1,
            ease: "power2.out"
        });
    });
}
