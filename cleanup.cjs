const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const original = html;

// Helper: remove section between two markers (inclusive)
function removeBetween(content, startStr, endStr) {
    const start = content.indexOf(startStr);
    if (start === -1) { console.log('NOT FOUND:', startStr.substring(0, 60)); return content; }
    const end = content.indexOf(endStr, start);
    if (end === -1) { console.log('END NOT FOUND for:', startStr.substring(0, 60)); return content; }
    console.log('Removing from', start, 'to', end + endStr.length);
    return content.substring(0, start) + content.substring(end + endStr.length);
}

// 1. Remove "OUR PEOPLE" section
html = removeBetween(html, '<!-- People Section -->', '<!-- 2047 Vision Section -->');

// 2. Remove "THE CHALLENGE" section (barriers)
html = removeBetween(html, '<section id="barriers"', '</section>\n\n    <section id="transformation"');

// 3. Remove "THE STRATEGY" section (transformation)
html = removeBetween(html, '<section id="transformation"', '</section>\n\n    <section id="outcomes"');

// 4. Remove "WHAT YOU GET" section (outcomes)
html = removeBetween(html, '<section id="outcomes"', '</section>\n\n\n\n    <section id="qualification"');

// 5. Add images to 2047 Vision cards
html = html.replace(
    `<div style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(45deg, #111, #333); display: flex; align-items: center; justify-content: center;">
                                <div style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid var(--gold); border-top-color: transparent; animation: spin 2s linear infinite;"></div>
                            </div>`,
    `<div style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(45deg, #111, #333); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                                <img src="assets/robot.png" alt="AGI" style="height: 130%; opacity: 0.4; object-fit: cover; filter: drop-shadow(0 0 20px rgba(212,175,55,0.5));">
                                <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6));"></div>
                            </div>`
);

html = html.replace(
    `<div style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(135deg, var(--gold), #f9d423); display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 3rem; animation: floatIcon 3s ease-in-out infinite;">🌐</span>
                            </div>`,
    `<div style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(135deg, #d4af37, #f9d423); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                                <span style="font-size: 6rem; animation: floatIcon 3s ease-in-out infinite; filter: drop-shadow(0 0 20px rgba(0,0,0,0.3));">🌏</span>
                                <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.25));"></div>
                            </div>`
);

// 6. Make footer impressive
const oldFooter = html.indexOf('<footer class="site-footer">');
const footerEnd = html.indexOf('</footer>');
if (oldFooter !== -1 && footerEnd !== -1) {
    const newFooter = `<footer style="background: #0a0a0a; color: #fff; position: relative; overflow: hidden;">

        <!-- Decorative glow -->
        <div style="position: absolute; top: -200px; left: -200px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%); pointer-events: none;"></div>
        <div style="position: absolute; bottom: 0; right: 0; width: 400px; height: 400px; background: radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%); pointer-events: none;"></div>

        <!-- Top CTA bar -->
        <div style="border-bottom: 1px solid rgba(255,255,255,0.06); padding: 5rem 10%; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 2rem;">
            <div>
                <p style="font-size: 0.8rem; letter-spacing: 3px; color: var(--gold); text-transform: uppercase; margin-bottom: 1rem;">Ready to build the future?</p>
                <h2 style="font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3.5rem); color: #fff; margin: 0; line-height: 1.2;">Let&rsquo;s talk. <span style="color: var(--gold);">Answer is Yes.</span></h2>
            </div>
            <a href="contact.html" class="btn-gold" style="font-size: 1.1rem; padding: 1.2rem 3rem; white-space: nowrap;">Start a Conversation</a>
        </div>

        <!-- Main footer grid -->
        <div style="padding: 6rem 10%; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 5rem; border-bottom: 1px solid rgba(255,255,255,0.06);">
            
            <!-- Brand column -->
            <div>
                <a href="index.html" style="display: flex; align-items: center; gap: 1rem; text-decoration: none; margin-bottom: 2rem;">
                    <img src="assets/logo.png" alt="A AI Logo" style="height: 40px;">
                    <span style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 700; color: #fff;">A AI</span>
                </a>
                <p style="color: #666; line-height: 1.8; font-size: 0.95rem; max-width: 280px;">Innovation, Research and Development. Building the foundational technologies of the next human civilization.</p>
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <a href="#" style="width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: #666; font-size: 0.9rem; text-decoration: none; transition: all 0.3s;" onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)';this.style.color='#666'">in</a>
                    <a href="#" style="width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: #666; font-size: 0.9rem; text-decoration: none; transition: all 0.3s;" onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)';this.style.color='#666'">tw</a>
                    <a href="#" style="width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: #666; font-size: 0.9rem; text-decoration: none; transition: all 0.3s;" onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)';this.style.color='#666'">gh</a>
                </div>
            </div>

            <!-- Company links -->
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

            <!-- Services links -->
            <div>
                <h4 style="font-family: var(--font-heading); font-size: 0.75rem; letter-spacing: 3px; color: var(--gold); text-transform: uppercase; margin-bottom: 2rem;">Services</h4>
                <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem;">
                    <li><a href="solutions.html" style="color: #666; text-decoration: none; font-size: 0.95rem; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">Solutions</a></li>
                    <li><a href="tech.html" style="color: #666; text-decoration: none; font-size: 0.95rem; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">The Tech</a></li>
                    <li><a href="tech.html#innovation" style="color: #666; text-decoration: none; font-size: 0.95rem; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">Innovation</a></li>
                    <li><a href="tech.html#rd" style="color: #666; text-decoration: none; font-size: 0.95rem; transition: color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#666'">R&amp;D</a></li>
                </ul>
            </div>

            <!-- Contact info -->
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

        <!-- Bottom bar -->
        <div style="padding: 2rem 10%; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <p style="color: #444; font-size: 0.85rem; margin: 0;">&copy; 2026 A AI Innovation, Research and Development. All rights reserved.</p>
            <p style="color: #333; font-size: 0.8rem; margin: 0; letter-spacing: 2px; text-transform: uppercase;">Answer is Yes.</p>
        </div>
    </footer>`;

    html = html.substring(0, oldFooter) + newFooter + html.substring(footerEnd + 9);
    console.log('Footer replaced.');
}

fs.writeFileSync('index.html', html);
console.log('All changes applied successfully!');
