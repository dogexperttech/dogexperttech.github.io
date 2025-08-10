const fs = require('fs');
const path = require('path');
const mime = require('mime-types');  // npm install mime-types

function scanDir(dirPath) {
  const items = [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue; // peida peidetud failid, kui soovid

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      items.push({
        name: entry.name,
        type: "dir",
        contents: scanDir(fullPath)
      });
    } else if (entry.isFile()) {
      const stats = fs.statSync(fullPath);
      items.push({
        name: entry.name,
        type: "file",
        size: stats.size,  // baitides
        mimeType: mime.lookup(fullPath) || 'application/octet-stream',
        download_url: `./${path.relative(process.cwd(), fullPath).replace(/\\/g, '/')}`
      });
    }
  }

  return items;
}

const targetDir = process.argv[2] || '.';  // Kaust ka käsurealt sisse anda, vaikimisi käesolev kaust

const directoryTree = {
  files: scanDir(targetDir)
};

fs.writeFileSync('files.json', JSON.stringify(directoryTree, null, 2));

console.log('JSON faili loomine valmis: files.json');
