const express = require('express');
const session = require('express-session');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

app.use(session({
  secret: 'midagi-salat',
  resave: false,
  saveUninitialized: true,
}));

app.get('/', (req, res) => {
  if (!req.session.tokens) {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    return res.send(`<h1>Logi sisse Google kontoga</h1><a href="${authUrl}">Logi sisse</a>`);
  }
  res.redirect('/files');
});

app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('Authorization code puudub');

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    req.session.tokens = tokens;
    res.redirect('/files');
  } catch (error) {
    console.error('OAuth token error:', error);
    res.status(500).send('Sisselogimine ebaõnnestus');
  }
});

app.get('/files', async (req, res) => {
  if (!req.session.tokens) {
    return res.status(401).json({ error: 'Pole sisselogitud' });
  }
  oauth2Client.setCredentials(req.session.tokens);
  const drive = google.drive({ version: 'v3', auth: oauth2Client });
  const FOLDER_ID = '1bJp3OsSDfWX4qbyz3Qx7MWpE2lRWz1RX'; // siia oma Drive kausta ID

  try {
    const result = await drive.files.list({
      pageSize: 100,
      fields: 'files(id, name, mimeType, webViewLink, webContentLink, size)',
      q: `'${FOLDER_ID}' in parents and trashed = false`,
    });

    const files = result.data.files.map(file => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      webViewLink: file.webViewLink,
      webContentLink: file.webContentLink,
      size: file.size || null
    }));

    res.json({ files });
  } catch (error) {
    console.error('Google Drive API error:', error);
    res.status(500).json({ error: 'Failide laadimine ebaõnnestus' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server käivitunud http://localhost:${PORT}`));
