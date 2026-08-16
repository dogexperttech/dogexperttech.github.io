import https from 'https';
import fs from 'fs';

// Usage: set env YT_CHANNEL_ID (channel id is NOT a secret). Writes to src/data/videos.json
// Optional: set env YT_API_KEY (YouTube Data API v3 key) to also filter out live streams/unlisted.
// Without a key it falls back to the public RSS feed (public videos only; may include past live streams).
const CHANNEL_ID = process.env.YT_CHANNEL_ID || process.env.CHANNEL_ID || 'UCCdit1D68jqUOKne5tKBALA';
const API_KEY = process.env.YT_API_KEY || '';
if (!CHANNEL_ID) {
  console.error('Missing YT_CHANNEL_ID or CHANNEL_ID environment variable');
  process.exit(1);
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function isLiveStreamContent(id) {
  return new Promise((resolve) => {
    https
      .get(`https://www.youtube.com/watch?v=${id}&hl=en`, { headers: { 'Accept-Language': 'en' } }, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          if (data.length < 5000000) data += chunk;
        });
        res.on('end', () => resolve(data.includes('"isLiveContent":true')));
      })
      .on('error', () => resolve(false));
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
    const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : id;
    const published = pubMatch ? pubMatch[1] : '';
    const url = linkMatch ? linkMatch[1] : `https://www.youtube.com/watch?v=${id}`;
    entries.push({ id, title, url, published });
  }
  return entries;
}

async function fetchWithDataApi() {
  // Search the channel's uploads, filter to regular videos (not live/upcoming streams).
  const searchUrl =
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}` +
    `&maxResults=50&order=date&type=video&key=${API_KEY}`;
  const data = await fetchJson(searchUrl);
  const items = data.items || [];
  const videos = [];
  for (const item of items) {
    const snippet = item.snippet || {};
    const liveBroadcast = snippet.liveBroadcastContent || 'none';
    // Skip live streams and upcoming premieres/streams.
    if (liveBroadcast !== 'none') continue;
    videos.push({
      id: item.id?.videoId || '',
      title: (snippet.title || '').trim().replace(/\s+/g, ' '),
      url: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
      published: snippet.publishedAt || '',
    });
  }
  return videos.filter((v) => v.id);
}

async function main() {
  try {
    let videos;
    if (API_KEY) {
      console.log('Using YouTube Data API with live-stream filtering...');
      videos = await fetchWithDataApi();
    } else {
      const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
      const xml = await fetchText(feedUrl);
      videos = parseFeed(xml);
      console.log('Using public RSS feed (no API key) - filtering streams by probing each video...');
      const filtered = [];
      for (const v of videos) {
        if (await isLiveStreamContent(v.id)) {
          console.log('Skipping live stream:', v.id, '-', v.title);
          continue;
        }
        filtered.push(v);
      }
      videos = filtered;
    }
    const outPath = 'src/data/videos.json';
    fs.writeFileSync(outPath, JSON.stringify(videos, null, 2), 'utf8');
    console.log('Wrote', outPath, 'entries:', videos.length);
  } catch (err) {
    console.error('Failed fetching/parsing:', err);
    process.exit(1);
  }
}

main();
