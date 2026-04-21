const fs = require('fs');
let html = fs.readFileSync('solutions.html', 'utf8');

// List of services in order they appear in index.html or solutions.html
const services = [
    { id: 'voice-ai', name: 'Voice AI Agent' },
    { id: 'bespoke-plans', name: 'Bespoke AI Plans' },
    { id: 'speed-market', name: 'Speed to Market' },
    { id: 'custom-solutions', name: 'Custom Solutions' },
    { id: 'ongoing-support', name: 'Ongoing Support' },
    { id: 'ai-receptionist', name: 'AI Receptionist' },
    { id: 'ai-video-avatar', name: 'AI Video Avatar' },
    { id: 'omnichannel-hub', name: 'Omnichannel AI Hub' },
    { id: 'backend-automation', name: 'Backend Automation' },
    { id: 'crm-optimizer', name: 'CRM AI Optimizer' }
];

// Regex to find the pairs of buttons
// <button class="btn-gold know-more-btn" style="margin-top: 1.5rem; padding: 0.6rem 1.2rem; font-size: 0.85rem; border: none; cursor: pointer; border-radius: 4px; pointer-events: auto;" onclick="event.stopPropagation(); window.location.href='contact.html'">Know More</button>
// <button class="btn-gold know-more-btn" style="margin-top: 1.5rem; padding: 0.6rem 1.2rem; font-size: 0.85rem; border: none; cursor: pointer; border-radius: 4px; pointer-events: auto;" onclick="event.stopPropagation(); window.location.href='contact.html'">Know More</button>

services.forEach(service => {
    const searchStr = `<h3 style="font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 0.5rem;">${service.name}</h3>`;
    const startIdx = html.indexOf(searchStr);
    
    if (startIdx !== -1) {
        // Find the next occurrence of </p>
        const pEndIdx = html.indexOf('</p>', startIdx);
        if (pEndIdx !== -1) {
            // Find the next two buttons and replace them with one
            const buttonsBlockStart = pEndIdx + 4;
            // Rough end of the buttons block (finding the next </div>)
            const divEndIdx = html.indexOf('</div>', buttonsBlockStart);
            
            if (divEndIdx !== -1) {
                const oldButtonsBlock = html.substring(buttonsBlockStart, divEndIdx);
                const newButton = `\n                <button class="btn-gold know-more-btn" style="margin-top: 1.5rem; padding: 0.6rem 1.2rem; font-size: 0.85rem; border: none; cursor: pointer; border-radius: 4px;" onclick="event.stopPropagation(); openServiceModal('${service.id}')">Know More</button>\n            `;
                
                html = html.substring(0, buttonsBlockStart) + newButton + html.substring(divEndIdx);
            }
        }
    }
});

fs.writeFileSync('solutions.html', html);
console.log('SUCCESS: Cleaned up duplicate buttons and updated triggers.');
