import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const videosPath = path.join(__dirname, '..', 'src', 'data', 'videos.json');
const outDir = path.join(__dirname, '..', 'src', 'pages', 'blog', 'video');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function slugifyId(id) {
  return String(id).replace(/[^a-zA-Z0-9_-]/g, '-');
}

function pageContent(video) {
  return `---
import Layout from '../../../../layouts/Layout.astro';
---

<Layout title="${escapeHtml(video.title)}" description="Video page - ${escapeHtml(video.title)}">
  <article class="post-container">
    <header class="post-header">
      <a class="back-link" href="/">← Back to Home</a>
      <h1>${escapeHtml(video.title)}</h1>
      <p class="post-meta">${new Date(video.published || Date.now()).toLocaleDateString()} | By Dog Expert Tech</p>
    </header>

    <div class="video-embed">
      <iframe src="https://www.youtube.com/embed/${video.id}" title="${escapeHtml(video.title)}" allowfullscreen loading="lazy"></iframe>
    </div>

    <div class="video-links">
      <p><a class="external-link" href="${escapeHtml(video.url || `https://www.youtube.com/watch?v=${video.id}`)}" target="_blank" rel="noopener noreferrer">Watch on YouTube</a></p>
    </div>

    <div class="post-body">
      <p>${escapeHtml(video.description || '')}</p>
    </div>

    <footer class="post-footer">
      <p>&copy; 2026 Dog Expert Tech</p>
    </footer>
  </article>
</Layout>

<style>
  .video-embed { width:100%; aspect-ratio:16/9; margin:1rem 0; }
  .video-embed iframe { width:100%; height:100%; border:0; }
  .post-container { max-width:900px; margin:2rem auto; padding:0 1rem; }
  .post-body { margin-top:1rem; }
</style>
`;
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[c]);
}

function main() {
  if (!fs.existsSync(videosPath)) {
    console.error('videos.json not found:', videosPath);
    process.exit(1);
  }
  const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
  ensureDir(outDir);

  for (const v of videos) {
    const id = slugifyId(v.id);
    const dir = path.join(outDir, id);
    ensureDir(dir);
    const file = path.join(dir, 'index.astro');
    fs.writeFileSync(file, pageContent(v), 'utf8');
    console.log('Wrote', file);
  }
}

main();
