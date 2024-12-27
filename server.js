const express = require('express');
const ytdl = require("@distube/ytdl-core");
const cors = require('cors');
const https = require('https');

const cookies = [
    {
        "domain": ".youtube.com",
        "expirationDate": 1750283405.726569,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "g.a000rggEgF9QY60ssnRE2O7FjIOezpVdt0mjg3ccB3-ldra681KQLxUl2hm2I7Y1Jv_IuuOFkAACgYKAcESARQSFQHGX2MiJBjAV_JezQvUg6hxhWYIzBoVAUF8yKoNGI_1LodDYMZjuMG4tzDK0076"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1750878713.831911,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSIDTS",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "sidts-CjEB7wV3sQ3wNixVi8ggfDM8Ev-p5Df_DSPQkKhh04BoygUJfTrwEs07j6as9kW2aj6VEAA"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1750283405.725201,
        "hostOnly": false,
        "httpOnly": false,
        "name": "SAPISID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "QqHEij_tX51oieea/AnlvMHwrKdOahkbsH"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1750879181.604954,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSIDCC",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AKEyXzVUlJSvsuA1EuPgK5EHSomexvUtvMuOC2EkKrmGqHmSuk-5JuA5lh_GX8Me0zxHajsu3YU"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1750283405.724953,
        "hostOnly": false,
        "httpOnly": true,
        "name": "SSID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AkYqB9RneE3qK0LBN"
    },
    {
        "domain": ".youtube.com",
        "hostOnly": false,
        "httpOnly": false,
        "name": "wide",
        "path": "/",
        "sameSite": "lax",
        "secure": true,
        "session": true,
        "storeId": null,
        "value": "1"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1750283405.725314,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-1PAPISID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "QqHEij_tX51oieea/AnlvMHwrKdOahkbsH"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1750283405.726447,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "g.a000rggEgF9QY60ssnRE2O7FjIOezpVdt0mjg3ccB3-ldra681KQLu8QThv-QEv0uwsxaG2i_gACgYKAZwSARQSFQHGX2MiVt0IrDp3PNxwuL-gQ8sEGhoVAUF8yKru2iVf8Yu0NXkZNty-xaf90076"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1750283405.725457,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-3PAPISID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "QqHEij_tX51oieea/AnlvMHwrKdOahkbsH"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1750879181.605099,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDCC",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AKEyXzUi_TUESwZIPtU6CVPp--HEN8BkIoCJ9_W2krA_pfe9ofSsfAx_fclRCiDJ8i9TMYPNqAc"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1750878713.832172,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDTS",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "sidts-CjEB7wV3sQ3wNixVi8ggfDM8Ev-p5Df_DSPQkKhh04BoygUJfTrwEs07j6as9kW2aj6VEAA"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1741557526.567862,
        "hostOnly": false,
        "httpOnly": true,
        "name": "LOGIN_INFO",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AFmmF2swRAIgd7jHWyRjt6TKmOBqkNC1j7jkBPd6u_PcYl44G9rhiCACIGZ-zLtp-zAuUMV0_aT9XPVyQT-7Tr2tMvZpb8j_UdIE:QUQ3MjNmek10ZlowZ2RJYkdEOHlPY0UtX1BLZ28yN00zeUJVUklIQUwySFBuTEt4MnM4RTd2Y3dnZE1pZ25OY1ktUkMyekRzY3dYZUExQkN5UVF4elVnZmNZYjd1cnRTLS1XN09JZGg0Ynp4ejNTcGNWbEd4MnJGbmVRRm9rbEVwQ25fVWNUTGdkanlHM3Jha0JMNUNwbG51b0I3cTNveFNR"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1735931978.42793,
        "hostOnly": false,
        "httpOnly": false,
        "name": "PREF",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "f7=4100&f6=40000000&tz=America.Sao_Paulo&f5=30000"
    }
]
const env = 'http://127.0.0.1:5500';
// 'https://jukebox-wza8.onrender.com'

const app = express();
const port = 3000;
const corsOptions = {
    origin: [env],
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Content-Disposition'],
    exposedHeaders: ['Content-Disposition'],
    credentials: true,
    optionsSuccessStatus: 200
  };
const agent = ytdl.createAgent(cookies);
app.use(cors(corsOptions));
app.use(express.json());
app.options('*', cors(corsOptions));
app.get('/', (req, res) => {
    res.json({ status: 'backend is running' });
  });

app.post('/download/audio', async (req, res) => {
  res.header('Access-Control-Allow-Origin', env);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Disposition');
  res.header('Access-Control-Expose-Headers', 'Content-Disposition');
  const url = req.body.message;
  if (ytdl.validateURL(url)) {
    try {
        const videoInfo = await ytdl.getInfo(url, agent);
      const videoTitle = videoInfo.videoDetails.title.replace('—', '-');

      res.header('content-type', 'application/json')
      res.header('Content-Disposition', `attachment; filename="${videoTitle}.mp3"`);
      res.header('Content-Type', 'audio/mpeg');
      res.set('Access-Control-Expose-Headers', 'Content-Disposition');

      ytdl(url, {filter: 'audioonly'}).pipe(res);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  } 
  else {
    res.status(400).json({success: false, message: 'Invalid URL'});
  }
});

app.post('/download/thumbnail', async (req, res) => {
  res.header('Access-Control-Allow-Origin', env);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Disposition');
  res.header('Access-Control-Expose-Headers', 'Content-Disposition');
  const url = req.body.message;
  if (ytdl.validateURL(url)) {
    try {
      const videoInfo = await ytdl.getInfo(url, agent);
      const videoThumbnail = videoInfo.videoDetails.thumbnails.slice(-1)[0].url;

      // pipe the thumbnail to the response
      https.get(videoThumbnail, (response) => {
        res.header('Content-Type', response.headers['content-type']);
        response.pipe(res);
      });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  } 
  else {
    res.status(400).json({success: false, message: 'Invalid URL'});
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});