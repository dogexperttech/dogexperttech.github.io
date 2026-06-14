import https from 'https';
import fs from 'fs';

// Usage: set env YT_CHANNEL_ID (channel id is NOT a secret). Writes to src/data/videos.json
// default channel id provided (non-secret); can be overridden via env var
const CHANNEL_ID = process.env.YT_CHANNEL_ID || process.env.CHANNEL_ID || 'UCCdit1D68jqUOKne5tKBALA';
if (!CHANNEL_ID) {
  console.error('Missing YT_CHANNEL_ID or CHANNEL_ID environment variable');
  process.exit(1);
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseFeed(xml) {
  const entries = [];
  const parts = xml.split('<entry>');
  parts.shift(); // drop before first entry
  for (const part of parts) {
    const idMatch = part.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = part.match(/<title>([^<]+)<\/title>/);
    const pubMatch = part.match(/<published>([^<]+)<\/published>/);
    const linkMatch = part.match(/<link[^>]+href="([^"]+)"/);
    if (!idMatch) continue;
    const id = idMatch[1];
    const title = titleMatch ? titleMatch[1] : id;
    const published = pubMatch ? pubMatch[1] : '';
    const url = linkMatch ? linkMatch[1] : `https://www.youtube.com/watch?v=${id}`;
    entries.push({ id, title, url, published });
  }
  return entries;
}

async function main() {
  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
    const xml = await fetchText(feedUrl);
    const videos = parseFeed(xml);
    const outPath = 'src/data/videos.json';
    fs.writeFileSync(outPath, JSON.stringify(videos, null, 2), 'utf8');
    console.log('Wrote', outPath, 'entries:', videos.length);
  } catch (err) {
    console.error('Failed fetching/parsing feed:', err);
    process.exit(1);
  }
}

main();
