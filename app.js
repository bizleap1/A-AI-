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
        const ringMat = new THREE.MeshBasicMaterial({ color: '#d4af37', side: THREE.DoubleSide, transparent: true, opacity: 0.6 });

        for (let i = 0; i < 3; i++) {
            const ringGeo = new THREE.TorusGeometry(2.2 + (i * 0.6), 0.035, 16, 100);
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
    tl.to(pLeft, { x: "-380px", rotateY: -20, duration: 2.5 }, 0.5);
    tl.to(pRight, { x: "380px", rotateY: 20, duration: 2.5 }, 0.5);

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
    tl.to("#circle-badge", {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
    }, "-=1.5");

    tl.to(".cta-reveal", { opacity: 1, duration: 0.8 }, "-=0.5");

    // Step 6: Floating Cards Reveal
    tl.to(".floating-ui-card", {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "back.out(1.7)"
    }, "-=1");

    // Step 7: Orbital nav nodes
    tl.to(".orbit-node", {
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.5)"
    }, "-=0.8");

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
    for (let i = 0; i < 3000; i++) pos[i] = (Math.random() - 0.5) * 20;
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
    // 1. Smooth Scroll Reveals
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Interactive Gold Buttons
    document.querySelectorAll('.btn-gold').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            gsap.to(btn, {
                transform: `scale(1.05) translate(${(x - rect.width / 2) / 10}px, ${(y - rect.height / 2) / 10}px)`,
                duration: 0.3
            });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { transform: 'scale(1) translate(0,0)', duration: 0.3 });
        });
    });

    initServiceModals();
    initTerminalAnimation();
    initBlueprintAnimation();
}

function initTerminalAnimation() {
    const terminal = document.getElementById('tech-terminal');
    if (!terminal) return;

    const lines = [
        '> initialize a-core-v4.2... [OK]',
        '> connecting to secure-vector-cluster-01... [DONE]',
        '> primary reasoning engine: ACTIVE',
        '> latency: 74ms | context_window: 128,000',
        '> running security audit... [NO THREATS FOUND]',
        '> systems operational. A AI is ready.'
    ];

    const typeLine = (index) => {
        if (index >= lines.length) {
            const cursor = document.createElement('span');
            cursor.className = 'terminal-cursor';
            terminal.appendChild(cursor);
            return;
        }

        const div = document.createElement('div');
        div.className = 'terminal-line';
        div.textContent = lines[index];
        terminal.appendChild(div);

        setTimeout(() => {
            div.classList.add('visible');
            setTimeout(() => typeLine(index + 1), 600);
        }, 100);
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            terminal.innerHTML = '';
            typeLine(0);
            observer.unobserve(terminal);
        }
    }, { threshold: 0.5 });

    observer.observe(terminal);
}

function initBlueprintAnimation() {
    const nodes = document.querySelectorAll('.blueprint-node');
    if (!nodes.length) return;

    let currentIndex = 0;
    setInterval(() => {
        nodes.forEach(n => n.classList.remove('active'));
        nodes[currentIndex].classList.add('active');
        currentIndex = (currentIndex + 1) % nodes.length;
    }, 2500);
}

// Expose functions globally for onclick triggers
window.openServiceModal = (id) => {
    const modal = document.getElementById('service-modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody || !window.serviceData) return;

    const data = window.serviceData[id];
    if (!data) return;

    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-tag">${data.tag}</div>
            <h2>${data.title}</h2>
        </div>

        <div class="modal-grid">
            <div class="modal-left">
                <div class="modal-detail-section">
                    <h4>Overview</h4>
                    <p class="modal-long-desc">${data.longDesc}</p>
                </div>

                <div class="modal-detail-section">
                    <h4>Core Capabilities</h4>
                    <ul class="modal-service-list" style="grid-template-columns: 1fr; gap: 1rem; margin-top: 0;">
                        ${data.capabilities.map(c => `
                            <li style="padding: 1.2rem; background: #fafafa; border-radius: 12px; display: flex; gap: 1rem; align-items: start; color: #333; border: 1px solid #f0f0f0;">
                                <span style="color: var(--gold); font-weight: bold;">→</span>
                                ${c}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>

            <div class="modal-right">
                <div class="modal-detail-section">
                    <h4>Industry Use Cases</h4>
                    <div class="modal-use-cases">
                        ${data.useCases.map(u => `
                            <div class="use-case-item">
                                <strong>${u.title}</strong>
                                <p>${u.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="modal-detail-section">
                    <h4>Technical Architecture</h4>
                    <div class="tech-tag-container">
                        ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                    </div>
                </div>

                <div style="margin-top: 3rem; background: #000; padding: 2rem; border-radius: 20px; color: #fff;">
                    <p style="font-size: 0.8rem; letter-spacing: 2px; color: var(--gold); margin-bottom: 1rem; font-weight: 700;">READY TO SCALE?</p>
                    <h3 style="font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 1.5rem;">Start your infrastructure audit today.</h3>
                    <a href="contact.html" class="btn-gold" style="width: 100%; text-align: center; border-radius: 12px; background: #fff; color: #000;">Consult Our Engineers</a>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.scrollTop = 0;
};

window.serviceData = {
    'voice-ai': {
        tag: '01 — VOICE ARCHITECTURE',
        title: 'High-Fidelity Voice Synthesis.',
        longDesc: 'Our Voice AI infrastructure represents the pinnacle of auditory neural engineering. We move beyond simple "text-to-speech" by implementing a low-latency inference engine that understands context, tone, and intent in real-time. This allows for fluid, human-like conversations that can handle complex multi-turn reasoning without the jarring delays of traditional voicebots.',
        capabilities: [
            'Real-time emotional prosody tuning',
            'Sub-100ms response latency for zero friction',
            'Native support for 15+ global languages & dialects',
            'Advanced dialect & accent adaptation logic',
            'Seamless human-handoff triggers with full context',
            'Recursive context retention across multiple sessions'
        ],
        useCases: [
            { title: 'Customer Triage', desc: 'Deflecting 80% of inbound L1 queries with 95% accuracy.' },
            { title: 'Real Estate', desc: 'Vetting leads and scheduling viewings on autopilot 24/7.' },
            { title: 'Finance', desc: 'High-security identity verification and automated account triage.' }
        ],
        techStack: ['Whisper-Large-v3', 'Fine-tuned GPT-4o', 'WebRTC', 'ElevenLabs Turbo-v2.5']
    },
    'bespoke-plans': {
        tag: '02 — STRATEGY',
        title: 'Enterprise AI Roadmaps.',
        longDesc: 'An enterprise-wide AI transformation is not a single deployment; it is a strategic migration. We architect custom blueprints that audit your existing data silos, identify high-ROI automation opportunities, and establish a security-first integration framework. Our plans are designed to ensure that AI becomes a compounding asset rather than a fragmented tool.',
        capabilities: [
            'Comprehensive Multi-Silo Data Audit',
            'Security & Data Sovereignty risk analysis',
            'ROI-indexed task prioritization framework',
            'Cross-department integration roadmap',
            'Strategic LLM & foundational model selection',
            'Infrastructure scalability & stress-testing'
        ],
        useCases: [
            { title: 'Legal Tech', desc: 'Automating contract lifecycle management and risk analysis.' },
            { title: 'Manufacturing', desc: 'Predictive maintenance scheduling across global plants.' },
            { title: 'Pharma R&D', desc: 'Accelerating clinical trial data synthesis and reporting.' }
        ],
        techStack: ['Proprietary Audit Framework', 'Python Analytics', 'Claude 3.5 Strategic Focus']
    },
    'speed-market': {
        tag: '03 — AGILITY',
        title: 'Accelerated Deployment Cycles.',
        longDesc: 'In the AI era, speed is the ultimate competitive advantage. Our modular development approach allows enterprises to move from conceptualization to full production in weeks instead of months. We utilize pre-built foundational layers for security, compliance, and UI, focusing our engineering resources strictly on your unique proprietary logic.',
        capabilities: [
            'Agile rapid-prototyping environments',
            'Modular security & compliance scaffolding',
            'Automated CI/CD pipelines for AI models',
            '60% reduction in typical R&D timelines',
            'Live-testing labs for user feedback loops',
            'Instant global edge-deployment capabilities'
        ],
        useCases: [
            { title: 'E-commerce', desc: 'Rolling out personalized shopping assistants in under 14 days.' },
            { title: 'Saas Products', desc: 'Integrating "Chat-with-Data" features for end-users rapidly.' },
            { title: 'Fintech', desc: 'Rapid deployment of real-time fraud detection overlays.' }
        ],
        techStack: ['Next.js 14', 'Vercel AI SDK', 'Docker/K8s', 'Vector DB Scaffolding']
    },
    'custom-solutions': {
        tag: '04 — ENGINEERING',
        title: 'Custom Core Engineering.',
        longDesc: 'We specialize in solving the engineering challenges that off-the-shelf tools can’t touch. Our team builds custom wrappers, fine-tuned models, and proprietary data ingestion pipelines that sit securely behind your firewall. We don’t just "use" AI; we engineer it to behave exactly how your business logic requires.',
        capabilities: [
            'Zero-trust security & data isolation',
            'Proprietary RAG (Retrieval-Augmented Generation) clusters',
            'Custom fine-tuning of Llama-3 & Mistral models',
            'Hybrid cloud/on-premise deployment options',
            'Long-term model evolution & monitoring',
            'API-first headless AI architectures'
        ],
        useCases: [
            { title: 'Intelligence', desc: 'Building custom OSINT synthesis engines for departments.' },
            { title: 'HR Tech', desc: 'Automating resume-to-role matching with unbiased logic.' },
            { title: 'Supply Chain', desc: 'Custom logistics optimization using reinforcement learning.' }
        ],
        techStack: ['PyTorch', 'LangChain', 'Pinecone Vector DB', 'OpenAI API Tier-5']
    },
    'ongoing-support': {
        tag: '05 — SUSTAINABILITY',
        title: 'Operational Continuity 24/7.',
        longDesc: 'AI systems are living entities; they require monitoring, prompt-tuning, and performance auditing to maintain efficiency. Our Ongoing Support package ensures that your AI remains sharp, secure, and up-to-date with the latest model versions. We act as your fractional AI engineering department.',
        capabilities: [
            '24/7 technical surveillance of model drift',
            'Continuous prompt optimization & re-engineering',
            'Security patch management for AI gateways',
            'Quarterly ROI audits & efficiency reports',
            'Dedicated Lead Engineer for account support',
            'Bi-weekly feature updates & model versioning'
        ],
        useCases: [
            { title: 'Enterprise Support', desc: 'Maintaining 99.9% uptime for business-critical bots.' },
            { title: 'Marketing', desc: 'Iterating on personalized content bots for better CTR.' },
            { title: 'Security', desc: 'Monitoring AI usage to prevent prompt-injection attacks.' }
        ],
        techStack: ['Arize Phoenix', 'LangSmith', 'Prometheus/Grafana', 'Sentry']
    },
    'ai-receptionist': {
        tag: '06 — FRONTLINE',
        title: 'The AI Receptionist Cluster.',
        longDesc: 'Replace static IVR systems with an intelligent, conversational frontline. Our AI Receptionist doesn’t just "take messages"; it qualifies leads, syncs with multiple team calendars, answers complex product questions, and ensures that every caller feels heard and helped immediately.',
        capabilities: [
            'Real-time multi-calendar synchronization',
            'Automated lead scoring & qualification logic',
            'Brand-aligned persona and custom tonality',
            'Multi-channel follow-up (SMS/Email/WhatsApp)',
            'Instant transfer logic to human experts',
            'Automated appointment management & re-booking'
        ],
        useCases: [
            { title: 'Medical Clinics', desc: 'Handling appointment bookings and insurance triage.' },
            { title: 'Service Industry', desc: 'Managing bookings for spas, salons, and repairs.' },
            { title: 'B2B Sales', desc: 'Initial vetting of inbound calls before routing to AEs.' }
        ],
        techStack: ['Vapi.ai', 'Retell AI', 'Cal.com API', 'Make.com Automation']
    },
    'ai-video-avatar': {
        tag: '07 — VISUALS',
        title: 'Photorealistic Video Synthesis.',
        longDesc: 'Humanize your digital interactions at scale. Our AI Video Avatars create hyper-realistic representations of your leadership or brand personas, capable of speaking hundreds of languages with perfect lip-sync. This allows for personalized 1-on-1 video communication for thousands of customers simultaneously.',
        capabilities: [
            'Studio-quality lip-sync and body language',
            'Dynamic variable injection for personalized videos',
            'High-fidelity "voice cloning" of your key leaders',
            'Native support for 30+ broadcast languages',
            'API-driven instant video generation',
            'Interactive video capabilities for website embeds'
        ],
        useCases: [
            { title: 'Training', desc: 'Personalized onboarding videos for new employees.' },
            { title: 'Sales', desc: 'Sending "recorded" personalized pitches to 500+ leads daily.' },
            { title: 'Customer Success', desc: 'Visual walkthroughs for support tickets.' }
        ],
        techStack: ['HeyGen API', 'Tavus', 'Twelve Labs', 'FFmpeg Cloud']
    },
    'omnichannel-hub': {
        tag: '08 — UNIFIED',
        title: 'Omnichannel Intelligence Hub.',
        longDesc: 'Siloed communication is the enemy of efficiency. We bridge your web-chat, SMS, WhatsApp, and Voice channels into a single unified intelligence layer. A customer can start a conversation on WhatsApp and finish it via voice without ever having to repeat themselves.',
        capabilities: [
            'Cross-platform conversation state persistence',
            'Unified data layer for all customer touchpoints',
            'Real-time sentiment monitoring across channels',
            'Centralized dashboard for human oversight',
            'Automatic language detection and switching',
            'One-click integration with Shopify/Zendesk/Salesforce'
        ],
        useCases: [
            { title: 'Retail', desc: 'Managing orders and returns across social and web chat.' },
            { title: 'Hospitality', desc: 'Concierge services that span SMS and in-app chat.' },
            { title: 'Logistics', desc: 'Real-time tracking updates via the customer’s preferred app.' }
        ],
        techStack: ['Twilio Segment', 'MessageBird', 'Vector-based Memory Layers']
    },
    'backend-automation': {
        tag: '09 — OPERATIONS',
        title: 'Deep Backend Transformation.',
        longDesc: 'Automate the un-automatable. We use vision-models and advanced LLMs to process documents, extract structured data from unstructured emails, and bridge legacy software with modern AI workflows. Our goal is to eliminate manual data entry and operational friction entirely.',
        capabilities: [
            'Vision-based document & ID extraction',
            'Automated email-to-task synthesis logic',
            'Self-healing RPA (Robotic Process Automation)',
            'Legacy mainframe-to-AI wrappers',
            'Complex data migration & cleaning automation',
            'Automated error detection & anomaly alerting'
        ],
        useCases: [
            { title: 'Accounting', desc: 'Automating invoice reconciliation and expense audits.' },
            { title: 'Insurance', desc: 'Processing claims from photos and descriptions instantly.' },
            { title: 'HR', desc: 'Onboarding automation and legal document verification.' }
        ],
        techStack: ['Azure Form Recognizer', 'GPT-4o Vision', 'UiPath + AI SDK']
    },
    'crm-optimizer': {
        tag: '10 — REVENUE',
        title: 'CRM Intelligence Optimizer.',
        longDesc: 'Your CRM should be a proactive driver of growth, not just a static database. We layer AI over your sales data to predict churn, qualify leads based on intent rather than just clicks, and automate the tedious data entry that slows down your high-value sales talent.',
        capabilities: [
            'Predictive lead scoring & intent modeling',
            'Automated interaction summary & data logging',
            'Intelligent "Best Next Action" recommendations',
            'Churn prediction and proactive retention logic',
            'Automated lead enrichment from public data',
            'Voice-to-CRM transcription and task creation'
        ],
        useCases: [
            { title: 'SaaS Sales', desc: 'Identifying high-propensity renewal accounts automatically.' },
            { title: 'Agencies', desc: 'Automating reporting and client interaction summaries.' },
            { title: 'High-Ticket Retail', desc: 'Managing complex customer lifecycle marketing.' }
        ],
        techStack: ['Salesforce Einstein SDK', 'HubSpot Operations Hub', 'Apollo.io API']
    }
};

window.closeServiceModal = () => {
    const modal = document.getElementById('service-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scroll
};

function initServiceModals() {
    const modal = document.getElementById('service-modal');
    if (!modal) return;
    
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', window.closeServiceModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) window.closeServiceModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') window.closeServiceModal();
    });
}
