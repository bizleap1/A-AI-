const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startTag = '<section id="framework"';
const nextSectionTag = '<section id="qualification"';

const startIdx = html.indexOf(startTag);
const endIdx = html.indexOf(nextSectionTag);

if (startIdx !== -1 && endIdx !== -1) {
    const newHtml = html.substring(0, startIdx) + html.substring(endIdx);
    fs.writeFileSync('index.html', newHtml);
    console.log('SUCCESS: Removed methodology section.');
} else {
    console.log('ERROR: Could not find markers. startIdx:', startIdx, 'endIdx:', endIdx);
}
