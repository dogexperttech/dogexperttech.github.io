const fs = require('fs');
const path = require('path');

// Root folder where images come from
const baseDir = path.join(__dirname, 'assets', 'wallpapers');
const outputFile = path.join(__dirname, 'files.js');

// Supported file extensions
const imageExtensions = /\.(jpe?g|png|gif|webp|bmp)$/i;

// Recursive file collection
function getAllImages(dirPath) {
let results = [];
const files = fs.readdirSync(dirPath);

files.forEach(file => { 
const filePath = path.join(dirPath, file); 
const stat = fs.statSync(filePath); 

if (stat.isDirectory()) { 
results = results.concat(getAllImages(filePath)); 
} else if (imageExtensions.test(file)) { 
// Make relative (relative to __dirname), replace Windows backslashes 
const relativePath = path.relative(__dirname, filePath).replace(/\\/g, '/'); 
results.push(relativePath); 
} 
}); 

return results;
}

const images = getAllImages(baseDir);

// Generate the JS file, correctly as a template string
const content = `// Automatically generated

const images = [ 
${images.map(p => `"${p}"`).join(',\n ')}
];

module.exports = images;
`;

// Write file
fs.writeFileSync(outputFile, content, 'utf-8');

console.log(`✅ files.js generated (${images.length} files).`);