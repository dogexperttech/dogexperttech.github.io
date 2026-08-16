const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "../public/gallery/assets/wallpapers");
const outFile = path.join(__dirname, "../public/files.json");

const exts = /\.(jpg|jpeg|png|webp|gif)$/i;

function walk(dir, folder = "root") {
  let out = [];

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      out = out.concat(walk(full, file)); // folder name
    } else if (exts.test(file)) {
      const relPath = path
        .relative(path.join(__dirname, "../public"), full)
        .replace(/\\/g, "/");

      const name = path.basename(file, path.extname(file));

      out.push({
        src: `/${relPath}`,
        name,
        folder
      });
    }
  }

  return out;
}

const images = walk(baseDir);

fs.writeFileSync(outFile, JSON.stringify(images, null, 2));

console.log(`✅ Done: ${images.length} images`);