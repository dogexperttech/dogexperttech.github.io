import { readdir, stat, rename, unlink } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = new URL('../public', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const MAX_SIZE_KB = parseInt(process.env.COMPRESS_MAX_KB || '150', 10);
const JPEG_QUALITY = parseInt(process.env.COMPRESS_QUALITY || '80', 10);
const SKIP_DIRS = new Set(['_astro', '.git']);

let scanned = 0;
let compressed = 0;
let skipped = 0;

async function processImage(fullPath) {
  const info = await stat(fullPath);
  const sizeKB = info.size / 1024;
  const ext = extname(fullPath).toLowerCase();

  if (sizeKB <= MAX_SIZE_KB) {
    skipped++;
    return;
  }

  try {
    let pipeline;

    if (ext === '.png') {
      pipeline = sharp(fullPath)
        .resize({ width: 1920, height: 1080, fit: 'inside', withoutEnlargement: true })
        .png({ quality: JPEG_QUALITY, compressionLevel: 9 });
    } else {
      pipeline = sharp(fullPath)
        .resize({ width: 1920, height: 1080, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
    }

    const tmpPath = fullPath + '.tmp';
    await pipeline.toFile(tmpPath);
    const tmpStat = await stat(tmpPath);

    if (tmpStat.size < info.size) {
      await rename(tmpPath, fullPath);
      compressed++;
      const saved = ((1 - tmpStat.size / info.size) * 100).toFixed(1);
      console.log(`  compressed: ${basename(fullPath)} (${sizeKB.toFixed(0)}KB → ${(tmpStat.size / 1024).toFixed(0)}KB, -${saved}%)`);
    } else {
      await unlink(tmpPath);
      skipped++;
    }
  } catch (err) {
    console.error(`  failed: ${basename(fullPath)} - ${err.message}`);
    try { await unlink(fullPath + '.tmp'); } catch {}
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
      continue;
    }
    const ext = extname(entry.name).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
      scanned++;
      await processImage(full);
    }
  }
}

console.log(`Compressing images in public/ (max ${MAX_SIZE_KB}KB, JPEG q${JPEG_QUALITY})...`);
await walk(PUBLIC_DIR);
console.log(`Done. Scanned: ${scanned}, Compressed: ${compressed}, Skipped: ${skipped}`);
