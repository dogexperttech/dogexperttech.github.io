const fs = require('fs');
const path = require('path');

// Juurkaust, kust pildid tulevad
const baseDir = path.join(__dirname, 'assets', 'wallpapers');
const outputFile = path.join(__dirname, 'files.js');

// Toetatud faililaiendid
const imageExtensions = /\.(jpe?g|png|gif|webp|bmp)$/i;

// Rekursiivne failide kogumine
function getAllImages(dirPath) {
  let results = [];
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getAllImages(filePath));
    } else if (imageExtensions.test(file)) {
      // Tee suhteliseks (__dirname suhtes), asenda Windowsi kaldkriipsud
      const relativePath = path.relative(__dirname, filePath).replace(/\\/g, '/');
      results.push(relativePath);
    }
  });

  return results;
}

const images = getAllImages(baseDir);

// Genereeri JS-fail, korrektselt template stringina
const content = `// Automaatselt genereeritud

const images = [
  ${images.map(p => `"${p}"`).join(',\n  ')}
];

module.exports = images;
`;

// Kirjuta fail
fs.writeFileSync(outputFile, content, 'utf-8');

console.log(`✅ files.js genereeritud (${images.length} faili).`);
