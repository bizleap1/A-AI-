const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find the about-us div start
const startMarker = '<div id="about-us"';
const startIdx = html.indexOf(startMarker);

if (startIdx === -1) {
    console.log('ERROR: could not find about-us div');
    process.exit(1);
}

// Find the next "People Section" comment which is after the mission block
const endMarker = '<!-- People Section -->';
const endIdx = html.indexOf(endMarker, startIdx);

if (endIdx === -1) {
    console.log('ERROR: could not find People Section marker');
    process.exit(1);
}

// The old block is from startIdx to just before endIdx (the opening div + mission block)
// We need to also close the outer div tag right before People Section
// Let's find the closing of the mission div (the </div> just before People Section)
// It will be: "            </div>\n\n            <!-- People Section -->"

const closingBeforePeople = html.lastIndexOf('</div>', endIdx);
console.log('Start idx:', startIdx, 'End (closingBeforePeople):', closingBeforePeople);

const oldChunk = html.substring(startIdx, closingBeforePeople + 6); // include </div>

const newChunk = `</section>

    <!-- ABOUT US: MISSION & VISION -->
    <section id="about-us" style="background: #fff; padding: 10rem 10%; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -100px; right: -100px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%); pointer-events: none;"></div>

        <div style="text-align: center; margin-bottom: 6rem;">
            <span style="display: inline-block; padding: 0.4rem 1.2rem; background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.25); border-radius: 50px; font-size: 0.75rem; letter-spacing: 3px; font-weight: 700; color: #b8972e; margin-bottom: 2rem; text-transform: uppercase;">ABOUT US</span>
            <h2 style="font-family: var(--font-heading); font-size: clamp(3rem, 5vw, 5rem); line-height: 1.05; color: #111; margin: 0;">The Institution Built<br>to Say <span style="background: linear-gradient(90deg, var(--gold), #f9d423); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">&ldquo;Yes.&rdquo;</span></h2>
        </div>

        <!-- Mission + Vision side by side -->
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
                    <div><div style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--gold);">&#8734;</div><div style="font-size: 0.7rem; color: #555; letter-spacing: 2px; text-transform: uppercase; margin-top: 0.3rem;">Ambition</div></div>
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

        <div style="display: flex; flex-direction: column; gap: 8rem; margin-top: 8rem;">`;

html = html.substring(0, startIdx) + newChunk + html.substring(closingBeforePeople + 6);
fs.writeFileSync('index.html', html);
console.log('SUCCESS: About Us Mission & Vision section replaced!');
