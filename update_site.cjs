const fs = require('fs');
const path = require('path');

const newNav = `<a href="index.html">Home</a>
            <a href="solutions.html">Solutions</a>
            <a href="tech.html">The Tech</a>
            <a href="blogs.html">Blogs</a>
            <a href="careers.html">Careers</a>
            <a href="contact.html">Contact</a>`;

const newFooterLinks = `<li><a href="index.html#why-us">Why Us</a></li>
                    <li><a href="index.html#about-us">About Us</a></li>
                    <li><a href="index.html#leadership">Leadership</a></li>
                    <li><a href="solutions.html">Solutions</a></li>
                    <li><a href="tech.html">The Tech</a></li>
                    <li><a href="blogs.html">Blogs</a></li>
                    <li><a href="careers.html">Careers</a></li>`;

function updateGlobalLinks(filename) {
    if (!fs.existsSync(filename)) return;
    let content = fs.readFileSync(filename, 'utf8');
    
    // update nav
    content = content.replace(/<a href="index\.html">Home<\/a>[\s\S]*?<a href="contact\.html">Contact<\/a>/, newNav);
    
    // update footer
    content = content.replace(/<li><a href="index\.html">Home<\/a><\/li>[\s\S]*?<li><a href="company\.html">Company<\/a><\/li>/, newFooterLinks);
    
    fs.writeFileSync(filename, content);
    console.log(`Updated global links in ${filename}`);
}

// 1. Update solutions.html buttons
let solutions = fs.readFileSync('solutions.html', 'utf8');
solutions = solutions.replace(/(<h3.*?<\/h3>\s*<p.*?>.*?<\/p>)/g, `$1\n                <button class="btn-gold know-more-btn" style="margin-top: 1.5rem; padding: 0.6rem 1.2rem; font-size: 0.85rem; border: none; cursor: pointer; border-radius: 4px; pointer-events: auto;" onclick="event.stopPropagation(); window.location.href='contact.html'">Know More</button>`);
fs.writeFileSync('solutions.html', solutions);
console.log('Added Know More buttons to solutions.html');

// 2. Update tech.html layout
let tech = fs.readFileSync('tech.html', 'utf8');
// match everything inside <section style="..."> ... </section> after the nav and replace it
const techLayout = `<section style="padding: 10rem 10% 6rem; background: linear-gradient(135deg, #fefcf5 0%, #fff 100%);">
        <div style="text-align: left; margin-bottom: 6rem;">
            <span class="section-tag" style="display: inline-block; padding: 0.5rem 1.5rem; background: rgba(212, 175, 55, 0.1); border-radius: 50px; margin-bottom: 1rem;">THE SYNTHESIS</span>
            <h1 class="premium-title" style="font-size: clamp(3rem, 5vw, 4.5rem); line-height: 1.1; margin-bottom: 1rem;">Innovation & <br><span style="background: linear-gradient(90deg, var(--gold), #f9d423); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">R&D</span></h1>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 4rem;">
            <!-- Column 1 -->
            <div>
                <h2 style="font-size: 2.5rem; font-family: var(--font-heading); margin-bottom: 3rem; color: #111; border-bottom: 2px solid var(--gold); padding-bottom: 1rem;">Innovation</h2>
                <div style="display: flex; flex-direction: column; gap: 2.5rem;">
                    <div class="glass-card" style="background: #fff; box-shadow: 0 20px 50px rgba(0,0,0,0.05); border-left: 4px solid var(--gold);">
                        <h3 style="font-size: 1.6rem; margin-bottom: 1rem;">Existing Projects</h3>
                        <p style="color: #666; line-height: 1.7;">A comprehensive portfolio of deploying advanced machine learning models and automated workflows that currently drive our clients' operations.</p>
                        <ul style="list-style: none; padding: 0; margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
                            <li style="display: flex; gap: 1rem; align-items: center; color: #555;"><span style="color: var(--gold); font-weight: bold;">•</span> Enterprise AI Platforms</li>
                            <li style="display: flex; gap: 1rem; align-items: center; color: #555;"><span style="color: var(--gold); font-weight: bold;">•</span> NLP & Data Analytics</li>
                            <li style="display: flex; gap: 1rem; align-items: center; color: #555;"><span style="color: var(--gold); font-weight: bold;">•</span> Autonomous Systems</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Column 2 -->
            <div>
                <h2 style="font-size: 2.5rem; font-family: var(--font-heading); margin-bottom: 3rem; color: #111; border-bottom: 2px solid #111; padding-bottom: 1rem;">R&D</h2>
                <div style="display: flex; flex-direction: column; gap: 2.5rem;">
                    <div class="glass-card" style="background: #0a0a0a; color: #fff; box-shadow: 0 30px 60px rgba(0,0,0,0.2);">
                        <h3 style="font-size: 1.6rem; margin-bottom: 1rem; color: #fff;">Innovation & Customized Solutions</h3>
                        <p style="color: #ccc; line-height: 1.7;">Our dedicated labs continually push the limits of AGI research and bespoke architectural paradigms to define the next frontier of technology.</p>
                        <ul style="list-style: none; padding: 0; margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
                            <li style="display: flex; gap: 1rem; align-items: center; color: #aaa;"><span style="color: var(--gold); font-weight: bold;">•</span> AGI Prototypes</li>
                            <li style="display: flex; gap: 1rem; align-items: center; color: #aaa;"><span style="color: var(--gold); font-weight: bold;">•</span> Quantum AI Simulation</li>
                            <li style="display: flex; gap: 1rem; align-items: center; color: #aaa;"><span style="color: var(--gold); font-weight: bold;">•</span> Hyper-Custom Deployments</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

tech = tech.replace(/<section style="padding: 10rem 10% 6rem; background: linear-gradient\(135deg, #fefcf5 0%, #fff 100%\);">[\s\S]*?(?=<footer class="site-footer">)/, techLayout + '\n\n    ');
fs.writeFileSync('tech.html', tech);
console.log('Restructured tech.html layout');

// Update global links in existing files
['solutions.html', 'tech.html', 'contact.html'].forEach(updateGlobalLinks);

// Create blogs.html
const blogsContent = fs.readFileSync('tech.html', 'utf8')
    .replace(/<title>.*?<\/title>/, '<title>Blogs | A AI</title>')
    .replace(/<section[\s\S]*?(?=<footer class="site-footer">)/, 
`<section style="padding: 10rem 10% 6rem; background: linear-gradient(to bottom, #fff, #fafafa); min-height: 70vh;">
        <div style="text-align: center; margin-bottom: 6rem;">
            <span class="section-tag">LATEST INSIGHTS</span>
            <h1 class="premium-title" style="font-size: clamp(3rem, 5vw, 4.5rem);">Our <span style="background: linear-gradient(90deg, var(--gold), #f9d423); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Blogs</span></h1>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3rem; max-width: 1200px; margin: 0 auto;">
            
            <div class="glass-card" style="padding: 0; overflow: hidden; background: #fff; box-shadow: 0 15px 40px rgba(0,0,0,0.05); border: 1px solid #eee;">
                <div style="height: 220px; background: #111; position: relative; display: flex; align-items: center; justify-content: center; color: var(--gold); font-size: 4rem;">
                    🤖
                </div>
                <div style="padding: 2.5rem;">
                    <div style="font-size: 0.85rem; color: #888; margin-bottom: 1rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">AI Strategy · April 2026</div>
                    <h3 style="font-size: 1.6rem; margin-bottom: 1rem; font-family: var(--font-heading); line-height: 1.3;">The Evolution of Enterprise AI</h3>
                    <p style="color: #666; font-size: 1rem; line-height: 1.6; margin-bottom: 2rem;">Discover how leading enterprises are transitioning from basic automation to fully autonomous AGI infrastructures.</p>
                    <a href="#" style="color: var(--gold); font-weight: 600; text-decoration: none;">Read More &rarr;</a>
                </div>
            </div>

            <div class="glass-card" style="padding: 0; overflow: hidden; background: #fff; box-shadow: 0 15px 40px rgba(0,0,0,0.05); border: 1px solid #eee;">
                <div style="height: 220px; background: #fafafa; position: relative; display: flex; align-items: center; justify-content: center; color: var(--gold); font-size: 4rem;">
                    🔬
                </div>
                <div style="padding: 2.5rem;">
                    <div style="font-size: 0.85rem; color: #888; margin-bottom: 1rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">Research · March 2026</div>
                    <h3 style="font-size: 1.6rem; margin-bottom: 1rem; font-family: var(--font-heading); line-height: 1.3;">Quantum Simulators & AI</h3>
                    <p style="color: #666; font-size: 1rem; line-height: 1.6; margin-bottom: 2rem;">A deep dive into our latest R&D initiatives bridging quantum computing methodologies with neural nets.</p>
                    <a href="#" style="color: var(--gold); font-weight: 600; text-decoration: none;">Read More &rarr;</a>
                </div>
            </div>

        </div>
    </section>
    `);
fs.writeFileSync('blogs.html', blogsContent);
console.log('Created blogs.html');

// Create careers.html
const careersContent = fs.readFileSync('tech.html', 'utf8')
    .replace(/<title>.*?<\/title>/, '<title>Careers | A AI</title>')
    .replace(/<section[\s\S]*?(?=<footer class="site-footer">)/, 
`<section style="padding: 10rem 10% 6rem; background: linear-gradient(135deg, #fefcf5 0%, #fff 100%); min-height: 70vh;">
        <div style="text-align: center; margin-bottom: 6rem;">
            <span class="section-tag">JOIN THE MISSION</span>
            <h1 class="premium-title" style="font-size: clamp(3rem, 5vw, 4.5rem);">Build the <span style="background: linear-gradient(90deg, var(--gold), #f9d423); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Future</span></h1>
            <p style="font-size: 1.2rem; color: #666; max-width: 700px; margin: 1.5rem auto 0;">We are looking for pioneers who want to say 'Yes' to the hardest challenges.</p>
        </div>

        <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 6rem;">
            
            <!-- Jobs -->
            <div>
                <h2 style="font-size: 2.5rem; font-family: var(--font-heading); margin-bottom: 3rem; color: #111; border-bottom: 2px solid var(--gold); padding-bottom: 1rem;">Open Jobs</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem;">
                    <div class="glass-card" style="background: #fff; box-shadow: 0 15px 40px rgba(0,0,0,0.05); border: 1px solid #eee; display: flex; flex-direction: column;">
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">AI Systems Architect</h3>
                        <p style="color: var(--gold); font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem;">Full-Time • Pune / Hybrid</p>
                        <p style="color: #666; margin-bottom: 2rem; flex: 1;">Architect and deploy complex autonomous AI pipelines across enterprise domains.</p>
                        <a href="contact.html" class="btn-gold" style="text-align: center;">Apply Now</a>
                    </div>
                    <div class="glass-card" style="background: #0a0a0a; color: #fff; box-shadow: 0 20px 50px rgba(0,0,0,0.15); display: flex; flex-direction: column; border-top: 4px solid var(--gold);">
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #fff;">Lead Frontend Developer</h3>
                        <p style="color: var(--gold); font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem;">Full-Time • Pune</p>
                        <p style="color: #aaa; margin-bottom: 2rem; flex: 1;">Build high-performance, animative, and responsive UI for generative platforms.</p>
                        <a href="contact.html" class="btn-gold" style="text-align: center; background: #fff; color: #111;">Apply Now</a>
                    </div>
                </div>
            </div>

            <!-- Internships -->
            <div>
                <h2 style="font-size: 2.5rem; font-family: var(--font-heading); margin-bottom: 3rem; color: #111; border-bottom: 2px solid #111; padding-bottom: 1rem;">Internships</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem;">
                    <div class="glass-card" style="background: #fafafa; border: 1px dashed #ccc; border-radius: 20px; display: flex; flex-direction: column;">
                        <span style="background: #111; color: #fff; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: bold; align-self: flex-start; margin-bottom: 1rem;">SUMMER 2026</span>
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Machine Learning Intern</h3>
                        <p style="color: #666; margin-bottom: 2rem; flex: 1;">Work directly with our R&D team building generative data synthesis tools.</p>
                        <a href="contact.html" style="font-weight: 600; color: #111; text-decoration: underline;">Apply for Internship &rarr;</a>
                    </div>
                    <div class="glass-card" style="background: #fafafa; border: 1px dashed #ccc; border-radius: 20px; display: flex; flex-direction: column;">
                        <span style="background: #111; color: #fff; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem; font-weight: bold; align-self: flex-start; margin-bottom: 1rem;">ONGOING</span>
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Design & UX Intern</h3>
                        <p style="color: #666; margin-bottom: 2rem; flex: 1;">Craft premium, high-end interfaces and 3D web-based animations.</p>
                        <a href="contact.html" style="font-weight: 600; color: #111; text-decoration: underline;">Apply for Internship &rarr;</a>
                    </div>
                </div>
            </div>

        </div>
    </section>
    `);
fs.writeFileSync('careers.html', careersContent);
console.log('Created careers.html');

// Delete company.html
if (fs.existsSync('company.html')) {
    fs.unlinkSync('company.html');
    console.log('Deleted company.html');
}

console.log('All updates complete.');
