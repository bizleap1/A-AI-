const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update nav links (remove Company, add Blogs/Careers)
html = html.replace(
    /<a href="index\.html">Home<\/a>[\s\S]*?<a href="contact\.html">Contact<\/a>/,
    `<a href="index.html">Home</a>
            <a href="solutions.html">Solutions</a>
            <a href="tech.html">The Tech</a>
            <a href="blogs.html">Blogs</a>
            <a href="careers.html">Careers</a>
            <a href="contact.html">Contact</a>`
);

// 2. Replace barriers + transformation + outcomes sections with Why Us + About Us + 2047 Vision + Leadership
const oldSectionsStart = html.indexOf('<section id="barriers"');
const frameworkStart = html.indexOf('<section id="framework"');

if (oldSectionsStart === -1 || frameworkStart === -1) {
    console.log('ERROR: Could not find section markers. barriers:', oldSectionsStart, 'framework:', frameworkStart);
    process.exit(1);
}

const newSections = `<!-- WHY US -->
    <section id="why-us" style="padding: 10rem 0 0; background: #0a0a0a; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -200px; left: -200px; width: 700px; height: 700px; background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%); pointer-events: none;"></div>
        <div style="position: absolute; bottom: -100px; right: -100px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%); pointer-events: none;"></div>

        <div style="padding: 0 10%; margin-bottom: 6rem;">
            <span style="display: inline-block; padding: 0.4rem 1.2rem; background: rgba(212,175,55,0.12); border: 1px solid rgba(212,175,55,0.3); border-radius: 50px; font-size: 0.75rem; letter-spacing: 3px; font-weight: 700; color: var(--gold); margin-bottom: 2.5rem; text-transform: uppercase;">WHY US</span>
            <div style="display: flex; gap: 6rem; align-items: flex-end; flex-wrap: wrap;">
                <div style="flex: 1.5; min-width: 300px;">
                    <h1 style="font-family: var(--font-heading); font-size: clamp(3rem, 5vw, 5.5rem); line-height: 1.05; color: #fff; margin: 0;">The Only Answer <br>We Know is <br><span style="background: linear-gradient(90deg, var(--gold), #f9d423); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">"Yes."</span></h1>
                </div>
                <div style="flex: 1; min-width: 280px;">
                    <p style="color: #aaa; font-size: 1.15rem; line-height: 1.8; margin: 0 0 2rem;">When others see obstacles, we see opportunities. When others say "too hard," we say "watch this." This is not optimism. <strong style="color: #fff;">This is conviction.</strong></p>
                    <p style="color: #888; font-size: 1rem; line-height: 1.8; margin: 0;">We don&rsquo;t rely on off-the-shelf tools or generic automation. A AI engineers bespoke, deeply integrated AI solutions built specifically around your operational architecture.</p>
                </div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 0 10%;">
            <div style="padding: 3rem 2rem; border-right: 1px solid rgba(255,255,255,0.08); text-align: center;">
                <div style="font-family: var(--font-heading); font-size: 3.5rem; font-weight: 700; color: var(--gold); line-height: 1;">100%</div>
                <div style="font-size: 0.8rem; letter-spacing: 2px; color: #666; margin-top: 0.5rem; text-transform: uppercase;">Bespoke Solutions</div>
            </div>
            <div style="padding: 3rem 2rem; border-right: 1px solid rgba(255,255,255,0.08); text-align: center;">
                <div style="font-family: var(--font-heading); font-size: 3.5rem; font-weight: 700; color: var(--gold); line-height: 1;">2047</div>
                <div style="font-size: 0.8rem; letter-spacing: 2px; color: #666; margin-top: 0.5rem; text-transform: uppercase;">Vision Target</div>
            </div>
            <div style="padding: 3rem 2rem; border-right: 1px solid rgba(255,255,255,0.08); text-align: center;">
                <div style="font-family: var(--font-heading); font-size: 3.5rem; font-weight: 700; color: var(--gold); line-height: 1;">3&times;</div>
                <div style="font-size: 0.8rem; letter-spacing: 2px; color: #666; margin-top: 0.5rem; text-transform: uppercase;">Faster Deployment</div>
            </div>
            <div style="padding: 3rem 2rem; text-align: center;">
                <div style="font-family: var(--font-heading); font-size: 3.5rem; font-weight: 700; color: var(--gold); line-height: 1;">&infin;</div>
                <div style="font-size: 0.8rem; letter-spacing: 2px; color: #666; margin-top: 0.5rem; text-transform: uppercase;">Scalability</div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); padding: 0 10%; margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
            <div class="why-card" style="padding: 4rem 3rem; border-right: 1px solid rgba(255,255,255,0.08); transition: background 0.4s; cursor: default;">
                <div style="font-size: 2rem; margin-bottom: 1.5rem;">&#129504;</div>
                <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: #fff; margin-bottom: 1rem;">Deep Custom Engineering</h3>
                <p style="color: #777; line-height: 1.7; font-size: 0.95rem;">Every system is architectured from zero around your domain&rsquo;s specific data flows, operational logic, and security requirements.</p>
            </div>
            <div class="why-card" style="padding: 4rem 3rem; border-right: 1px solid rgba(255,255,255,0.08); transition: background 0.4s; cursor: default;">
                <div style="font-size: 2rem; margin-bottom: 1.5rem;">&DoubleLeftRightArrow;</div>
                <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: #fff; margin-bottom: 1rem;">Speed to Impact</h3>
                <p style="color: #777; line-height: 1.7; font-size: 0.95rem;">Rapid prototyping and assessment-first deployment means you see real ROI in weeks, not quarters.</p>
            </div>
            <div class="why-card" style="padding: 4rem 3rem; transition: background 0.4s; cursor: default;">
                <div style="font-size: 2rem; margin-bottom: 1.5rem;">&#128274;</div>
                <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: #fff; margin-bottom: 1rem;">Security First</h3>
                <p style="color: #777; line-height: 1.7; font-size: 0.95rem;">Zero-trust architectures and enterprise-grade encryption ensure your AI systems are production-safe from day one.</p>
            </div>
            <div class="why-card" style="padding: 4rem 3rem; border-right: 1px solid rgba(255,255,255,0.08); border-top: 1px solid rgba(255,255,255,0.08); transition: background 0.4s; cursor: default;">
                <div style="font-size: 2rem; margin-bottom: 1.5rem;">&#127760;</div>
                <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: #fff; margin-bottom: 1rem;">Enterprise Scale</h3>
                <p style="color: #777; line-height: 1.7; font-size: 0.95rem;">Built for enterprises operating at scale. Our systems handle millions of data points and complex multi-department pipelines.</p>
            </div>
            <div class="why-card" style="padding: 4rem 3rem; border-right: 1px solid rgba(255,255,255,0.08); border-top: 1px solid rgba(255,255,255,0.08); transition: background 0.4s; cursor: default;">
                <div style="font-size: 2rem; margin-bottom: 1.5rem;">&#129309;</div>
                <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: #fff; margin-bottom: 1rem;">Long-Term Partnership</h3>
                <p style="color: #777; line-height: 1.7; font-size: 0.95rem;">We evolve with you. Continuous monitoring, iterative improvement, and proactive upgrades ensure your AI stays ahead.</p>
            </div>
            <div class="why-card" style="padding: 4rem 3rem; border-top: 1px solid rgba(255,255,255,0.08); transition: background 0.4s; cursor: default;">
                <div style="font-size: 2rem; margin-bottom: 1.5rem;">&#128202;</div>
                <h3 style="font-family: var(--font-heading); font-size: 1.4rem; color: #fff; margin-bottom: 1rem;">Quantified ROI</h3>
                <p style="color: #777; line-height: 1.7; font-size: 0.95rem;">Every engagement starts with an assessment. Every deliverable comes with clear KPIs and measurable impact reports.</p>
            </div>
        </div>
        <style>
            .why-card:hover { background: rgba(212,175,55,0.04); }
            .why-card:hover h3 { color: var(--gold) !important; }
        </style>
    </section>

    <!-- ABOUT US: MISSION & VISION -->
    <section id="about-us" style="background: #fff; padding: 10rem 10%; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -100px; right: -100px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%); pointer-events: none;"></div>

        <div style="text-align: center; margin-bottom: 6rem;">
            <span style="display: inline-block; padding: 0.4rem 1.2rem; background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.25); border-radius: 50px; font-size: 0.75rem; letter-spacing: 3px; font-weight: 700; color: #b8972e; margin-bottom: 2rem; text-transform: uppercase;">ABOUT US</span>
            <h2 style="font-family: var(--font-heading); font-size: clamp(3rem, 5vw, 5rem); line-height: 1.05; color: #111; margin: 0;">The Institution Built<br>to Say <span style="background: linear-gradient(90deg, var(--gold), #f9d423); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">&ldquo;Yes.&rdquo;</span></h2>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 5rem;">
            <!-- Mission -->
            <div style="background: #0a0a0a; border-radius: 28px; padding: 4rem; position: relative; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,0.12);">
                <div style="position: absolute; top: -60px; right: -60px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%);"></div>
                <div style="font-size: 2.5rem; margin-bottom: 1.5rem;">&#127919;</div>
                <span style="font-size: 0.7rem; letter-spacing: 3px; font-weight: 700; color: var(--gold); text-transform: uppercase;">Mission</span>
                <h3 style="font-family: var(--font-heading); font-size: 2rem; color: #fff; margin: 1rem 0 1.5rem; line-height: 1.2;">Yes to the Future.</h3>
                <p style="color: #aaa; line-height: 1.9; font-size: 1rem;">We build foundational technologies upon which the next human civilization will stand &mdash; AI, Quantum, Robotics, Materials, Space, Climate, Biology, Security.</p>
                <p style="color: #777; line-height: 1.9; font-size: 0.95rem; margin-top: 1.5rem;">Our daily mission: deliver absolute functional excellence by turning complex theoretical technologies into scalable enterprise-grade applications.</p>
                <div style="margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; gap: 2.5rem;">
                    <div><div style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--gold);">&infin;</div><div style="font-size: 0.7rem; color: #555; letter-spacing: 2px; text-transform: uppercase; margin-top: 0.3rem;">Ambition</div></div>
                    <div><div style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--gold);">0</div><div style="font-size: 0.7rem; color: #555; letter-spacing: 2px; text-transform: uppercase; margin-top: 0.3rem;">Compromises</div></div>
                    <div><div style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--gold);">1</div><div style="font-size: 0.7rem; color: #555; letter-spacing: 2px; text-transform: uppercase; margin-top: 0.3rem;">Answer</div></div>
                </div>
            </div>

            <!-- Vision -->
            <div style="background: #fafafa; border: 1px solid #eee; border-radius: 28px; padding: 4rem; position: relative; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.05);">
                <div style="position: absolute; bottom: -60px; left: -60px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%);"></div>
                <div style="font-size: 2.5rem; margin-bottom: 1.5rem;">&#127759;</div>
                <span style="font-size: 0.7rem; letter-spacing: 3px; font-weight: 700; color: #b8972e; text-transform: uppercase;">Vision &mdash; 2047</span>
                <h3 style="font-family: var(--font-heading); font-size: 2rem; color: #111; margin: 1rem 0 1.5rem; line-height: 1.2;">India&rsquo;s Centenary &amp; Beyond.</h3>
                <p style="color: #555; line-height: 1.9; font-size: 1rem;">By 2047, we envision a world unbound by repetitive manual limitations. A AI aims to be the central nervous system of global enterprise.</p>
                <p style="color: #888; line-height: 1.9; font-size: 0.95rem; margin-top: 1.5rem;">Setting the gold standard for Autonomous Systems and AGI &mdash; ensuring every technological leap creates compounding value for humanity.</p>
                <div style="margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid #eee; display: flex; gap: 2.5rem;">
                    <div><div style="font-family: var(--font-heading); font-size: 1.8rem; color: #111;">2047</div><div style="font-size: 0.7rem; color: #aaa; letter-spacing: 2px; text-transform: uppercase; margin-top: 0.3rem;">Target</div></div>
                    <div><div style="font-family: var(--font-heading); font-size: 1.8rem; color: #111;">AGI</div><div style="font-size: 0.7rem; color: #aaa; letter-spacing: 2px; text-transform: uppercase; margin-top: 0.3rem;">End Goal</div></div>
                    <div><div style="font-family: var(--font-heading); font-size: 1.8rem; color: #111;">&#127470;&#127475;</div><div style="font-size: 0.7rem; color: #aaa; letter-spacing: 2px; text-transform: uppercase; margin-top: 0.3rem;">From India</div></div>
                </div>
            </div>
        </div>

        <!-- Bold quote banner -->
        <div style="background: linear-gradient(135deg, #0a0a0a, #1a1a1a); border-radius: 24px; padding: 4rem 5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2rem;">
            <p style="font-family: var(--font-heading); font-size: clamp(1.4rem, 2.5vw, 2rem); color: #fff; margin: 0; line-height: 1.4; flex: 1; min-width: 280px;">&ldquo;We are scientists, engineers &amp; builders who came here because the default answer is always <span style="color: var(--gold);">Yes.</span>&rdquo;</p>
            <a href="contact.html" class="btn-gold" style="white-space: nowrap; flex-shrink: 0; font-size: 1rem;">Work With Us</a>
        </div>
    </section>

    <!-- 2047 VISION -->
    <section style="background: #fff; padding: 6rem 10% 10rem; position: relative;">
        <div style="text-align: center; margin-bottom: 4rem;">
            <span class="section-tag">THE FUTURE</span>
            <h2 class="premium-title" style="font-size: clamp(2.5rem, 4vw, 3.5rem);">2047 <span style="background: linear-gradient(90deg, var(--gold), #f9d423); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Vision</span></h2>
            <p style="font-size: 1.2rem; color: #666; margin-top: 1.5rem; max-width: 700px; margin-left: auto; margin-right: auto;">Our roadmap to building the foundational technologies of India&rsquo;s centenary.</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; max-width: 1200px; margin: 0 auto;">
            <div class="glass-card" style="position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.05); background: #fff; padding: 0; border: 1px solid #eee; transition: transform 0.4s;">
                <div style="height: 200px; overflow: hidden; position: relative;">
                    <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(45deg, #111, #333); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                        <img src="assets/robot.png" alt="AGI" style="height: 130%; opacity: 0.4; object-fit: cover; filter: drop-shadow(0 0 20px rgba(212,175,55,0.5));">
                        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6));"></div>
                    </div>
                </div>
                <div style="padding: 2.5rem;">
                    <h3 style="font-size: 1.6rem; margin-bottom: 1rem; font-family: var(--font-heading);">AGI Integration</h3>
                    <p style="color: #666; line-height: 1.6;">Seamless integration of Artificial General Intelligence into critical infrastructure and enterprise core operations.</p>
                </div>
            </div>
            
            <div class="glass-card" style="position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.05); background: #fff; padding: 0; border: 1px solid #eee; transition: transform 0.4s;">
                <div style="height: 200px; overflow: hidden; position: relative;">
                    <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(135deg, #d4af37, #f9d423); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                        <span style="font-size: 6rem; animation: floatIcon 3s ease-in-out infinite; filter: drop-shadow(0 0 20px rgba(0,0,0,0.3));">&#127759;</span>
                        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.25));"></div>
                    </div>
                </div>
                <div style="padding: 2.5rem;">
                    <h3 style="font-size: 1.6rem; margin-bottom: 1rem; font-family: var(--font-heading);">Global Expansion</h3>
                    <p style="color: #666; line-height: 1.6;">Establishing A AI as the global standard for responsible and autonomous system architectures.</p>
                </div>
            </div>
        </div>
        <style>
            @keyframes floatIcon { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        </style>
    </section>

    <!-- LEADERSHIP -->
    <section id="leadership" style="background: #fafafa; padding: 10rem 10%; position: relative;">
        <div style="text-align: center; margin-bottom: 4rem;">
            <span class="section-tag">THE LEADERSHIP</span>
            <h2 class="premium-title" style="font-size: clamp(2.5rem, 4vw, 3.5rem);">Our <span style="background: linear-gradient(90deg, var(--gold), #f9d423); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Founders</span></h2>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 3rem; max-width: 1200px; margin: 0 auto;">
            <!-- Kaushal -->
            <div class="glass-card" style="box-shadow: 0 20px 50px rgba(0,0,0,0.05); text-align: center; background: #fff; display: flex; flex-direction: column; align-items: center;">
                <div style="width: 200px; aspect-ratio: 1/1; border-radius: 50%; overflow: hidden; margin-bottom: 2rem; border: 4px solid #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <img src="assets/IMG_5607.JPG.jpeg" alt="Kaushal Banginwar" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(10%); transition: all 0.5s;" onmouseover="this.style.filter='grayscale(0) scale(1.05)';" onmouseout="this.style.filter='grayscale(10%) scale(1)';">
                </div>
                <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">Kaushal Banginwar</h3>
                <p style="color: var(--gold); font-size: 0.9rem; font-weight: 600; letter-spacing: 2px; margin-bottom: 1.5rem;">FOUNDER &amp; CTO</p>
                <p style="color: #666; font-size: 1rem; line-height: 1.6; flex: 1;">Kaushal Banginwar is the visionary architect behind A AI&rsquo;s core technological framework, bringing a profound expertise in advanced artificial intelligence systems and complex engineering infrastructures. With a focus on research-driven development, he specializes in building scalable, secure, and future-ready solutions that transform theoretical possibilities into high-performance industrial applications.</p>
            </div>

            <!-- Akshay -->
            <div class="glass-card" style="box-shadow: 0 20px 50px rgba(0,0,0,0.05); text-align: center; background: #fff; display: flex; flex-direction: column; align-items: center;">
                <div style="width: 200px; aspect-ratio: 1/1; border-radius: 50%; overflow: hidden; margin-bottom: 2rem; border: 4px solid #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <img src="assets/IMG_2049.JPG.jpeg" alt="Akshay Warghade" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(10%); transition: all 0.5s;" onmouseover="this.style.filter='grayscale(0) scale(1.05)';" onmouseout="this.style.filter='grayscale(10%) scale(1)';">
                </div>
                <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">Akshay Warghade</h3>
                <p style="color: var(--gold); font-size: 0.9rem; font-weight: 600; letter-spacing: 2px; margin-bottom: 1.5rem;">FOUNDER &amp; CEO</p>
                <p style="color: #666; font-size: 1rem; line-height: 1.6; flex: 1;">Akshay Warghade is a dynamic and influential force in Pune&rsquo;s real estate and infrastructure landscape, known for his strategic vision and strong execution capabilities. With deep-rooted connections across social and political networks in Maharashtra, he plays a pivotal role in driving complex projects through effective legal liaisoning and stakeholder alignment.</p>
            </div>

            <!-- Ruturaj -->
            <div class="glass-card" style="box-shadow: 0 20px 50px rgba(0,0,0,0.05); text-align: center; background: #fff; display: flex; flex-direction: column; align-items: center;">
                <div style="width: 200px; aspect-ratio: 1/1; border-radius: 50%; overflow: hidden; margin-bottom: 2rem; border: 4px solid #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <img src="assets/IMG_2264.JPG.jpeg" alt="Ruturaj Kulkarni" style="width: 100%; height: 100%; object-fit: cover; object-position: center; filter: grayscale(10%); transition: all 0.5s;" onmouseover="this.style.filter='grayscale(0) scale(1.05)';" onmouseout="this.style.filter='grayscale(10%) scale(1)';">
                </div>
                <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; font-family: var(--font-heading);">Ruturaj Kulkarni</h3>
                <p style="color: var(--gold); font-size: 0.9rem; font-weight: 600; letter-spacing: 2px; margin-bottom: 1.5rem;">FOUNDER &amp; CMO</p>
                <p style="color: #666; font-size: 1rem; line-height: 1.6; flex: 1;">Ruturaj Kulkarni is a results-driven global operations leader and dynamic strategist known for transforming vision into execution and building high-performance systems that deliver measurable growth. With strong international experience in managing complex environments, he combines precision, discipline, and strategic thinking to optimize operations, drive efficiency, and create scalable success.</p>
            </div>
        </div>
    </section>

`;

html = html.substring(0, oldSectionsStart) + newSections + html.substring(frameworkStart);

// 3. Replace old footer with premium dark footer
const oldFooterStart = html.indexOf('<footer class="site-footer">');
const oldFooterEnd = html.indexOf('</footer>');

if (oldFooterStart !== -1 && oldFooterEnd !== -1) {
    const newFooter = `<footer style="background: #0a0a0a; color: #fff; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -200px; left: -200px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%); pointer-events: none;"></div>
        <div style="position: absolute; bottom: 0; right: 0; width: 400px; height: 400px; background: radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%); pointer-events: none;"></div>

        <div style="border-bottom: 1px solid rgba(255,255,255,0.06); padding: 5rem 10%; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2rem;">
            <div>
                <p style="font-size: 0.8rem; letter-spacing: 3px; color: var(--gold); text-transform: uppercase; margin-bottom: 1rem;">Ready to build the future?</p>
                <h2 style="font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3.5rem); color: #fff; margin: 0; line-height: 1.2;">Let&rsquo;s talk. <span style="color: var(--gold);">Answer is Yes.</span></h2>
            </div>
            <a href="contact.html" class="btn-gold" style="font-size: 1.1rem; padding: 1.2rem 3rem; white-space: nowrap;">Start a Conversation</a>
        </div>

        <div style="padding: 6rem 10%; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 5rem; border-bottom: 1px solid rgba(255,255,255,0.06);">
            <div>
                <a href="index.html" style="display: flex; align-items: center; gap: 1rem; text-decoration: none; margin-bottom: 2rem;">
                    <img src="assets/logo.png" alt="A AI Logo" style="height: 40px;">
                    <span style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 700; color: #fff;">A AI</span>
                </a>
                <p style="color: #666; line-height: 1.8; font-size: 0.95rem; max-width: 280px;">Innovation, Research and Development. Building the foundational technologies of the next human civilization.</p>
            </div>
            <div>
                <h4 style="font-family: var(--font-heading); font-size: 0.75rem; letter-spacing: 3px; color: var(--gold); text-transform: uppercase; margin-bottom: 2rem;">Company</h4>
                <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem;">
                    <li><a href="index.html#why-us" style="color: #666; text-decoration: none; font-size: 0.95rem; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">Why Us</a></li>
                    <li><a href="index.html#about-us" style="color: #666; text-decoration: none; font-size: 0.95rem; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">About Us</a></li>
                    <li><a href="index.html#leadership" style="color: #666; text-decoration: none; font-size: 0.95rem; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">Leadership</a></li>
                    <li><a href="blogs.html" style="color: #666; text-decoration: none; font-size: 0.95rem; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">Blogs</a></li>
                    <li><a href="careers.html" style="color: #666; text-decoration: none; font-size: 0.95rem; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">Careers</a></li>
                </ul>
            </div>
            <div>
                <h4 style="font-family: var(--font-heading); font-size: 0.75rem; letter-spacing: 3px; color: var(--gold); text-transform: uppercase; margin-bottom: 2rem;">Services</h4>
                <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem;">
                    <li><a href="solutions.html" style="color: #666; text-decoration: none; font-size: 0.95rem; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">Solutions</a></li>
                    <li><a href="tech.html" style="color: #666; text-decoration: none; font-size: 0.95rem; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">The Tech</a></li>
                    <li><a href="tech.html#innovation" style="color: #666; text-decoration: none; font-size: 0.95rem; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">Innovation</a></li>
                    <li><a href="tech.html#rd" style="color: #666; text-decoration: none; font-size: 0.95rem; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">R&amp;D</a></li>
                </ul>
            </div>
            <div>
                <h4 style="font-family: var(--font-heading); font-size: 0.75rem; letter-spacing: 3px; color: var(--gold); text-transform: uppercase; margin-bottom: 2rem;">Contact</h4>
                <div style="display: flex; flex-direction: column; gap: 1.2rem;">
                    <div style="display: flex; gap: 1rem; align-items: flex-start;">
                        <span style="color: var(--gold); margin-top: 2px;">&#9679;</span>
                        <p style="color: #666; font-size: 0.9rem; line-height: 1.6; margin: 0;">Fashion Factory, SS Dhage Rd, Gultekdi, Pune</p>
                    </div>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <span style="color: var(--gold);">&#9679;</span>
                        <a href="tel:+917097095152" style="color: #666; font-size: 0.9rem; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">+91 70970 95152</a>
                    </div>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <span style="color: var(--gold);">&#9679;</span>
                        <a href="contact.html" style="color: #666; font-size: 0.9rem; text-decoration: none; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">Send us a message</a>
                    </div>
                </div>
            </div>
        </div>

        <div style="padding: 2rem 10%; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <p style="color: #444; font-size: 0.85rem; margin: 0;">&copy; 2026 A AI Innovation, Research and Development. All rights reserved.</p>
            <p style="color: #333; font-size: 0.8rem; margin: 0; letter-spacing: 2px; text-transform: uppercase;">Answer is Yes.</p>
        </div>
    </footer>`;

    html = html.substring(0, oldFooterStart) + newFooter + html.substring(oldFooterEnd + 9);
    console.log('Footer replaced.');
}

fs.writeFileSync('index.html', html);
console.log('SUCCESS: index.html fully rebuilt with Why Us, About Us, 2047 Vision, Leadership sections + premium footer.');
