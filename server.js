const express = require('express');
const ytdl = require("@distube/ytdl-core");
const cors = require('cors');
const https = require('https');

const cookies = [
    { name: "__Secure-3PSID", value: "g.a000rwgXDXgKOyWTrkxTEHKycYC5mVJTAstzFsIkXSWGwWwVtJzP3IkWtlETxezFlGODygG9iQACgYKAbESARMSFQHGX2MielacLu-sUmt6F2dEHadJnBoVAUF8yKpPCeTzTFZG8VUlvHmbsXdb0076" },
{ name: "GPS", value: "1" },
{ name: "__Secure-1PSIDTS", value: "sidts-CjIB7wV3sZUneN7kl9XjqYepxpRpRGh9T_iy7REUtiy332MZh7zs-U8FX7XCejEWz9EFeRAA" },
{ name: "SAPISID", value: "WvNRQ13hsogQX9XI/ANFzmEEtEX6dKpnES" },
{ name: "__Secure-1PSIDCC", value: "AKEyXzUdKFUraM-46duKMZiML2kD70Z-ALwQBP2c1T6K1NUusRSKnrNxlMnib-u0fswfwh5t" },
{ name: "SSID", value: "Ayogb9dIvlTl4sv-H" },
{ name: "__Secure-1PAPISID", value: "WvNRQ13hsogQX9XI/ANFzmEEtEX6dKpnES" },
{ name: "__Secure-1PSID", value: "g.a000rwgXDXgKOyWTrkxTEHKycYC5mVJTAstzFsIkXSWGwWwVtJzPfFY0ysq-_9YGPMmoUZQl3AACgYKAaQSARMSFQHGX2MiakEh2JPJluFI8jEuU6TjbhoVAUF8yKp-kbkGv84wcf6LVgYmLU3i0076" },
{ name: "__Secure-3PAPISID", value: "WvNRQ13hsogQX9XI/ANFzmEEtEX6dKpnES" },
{ name: "__Secure-3PSIDCC", value: "AKEyXzUdzfKo4T3l3Paaj-ok6Bq0dNPKZBDUiqcn9Tlye8RFqwVFUKpy8ZB8-Yw8ioNyGtqW" },
{ name: "__Secure-3PSIDTS", value: "sidts-CjIB7wV3sZUneN7kl9XjqYepxpRpRGh9T_iy7REUtiy332MZh7zs-U8FX7XCejEWz9EFeRAA" },
{ name: "LOGIN_INFO", value: "AFmmF2swRAIgc4XllTUIlYnQW_xNx8KA8z5Fbwi-0ZKAFURMeoTybcACIFprH3Gz9iuYHpnbjdP6AWDCU0uMDhApudyCLZS5uyJG:QUQ3MjNmeDg4ZGpDVVM2TWxac2JZLXExX2pZUWExZHF2MldaZWNkallMQ0xnYjk5R2NhdG1xRHotZnRmdXVMUDBjZVRHa0NRcmVXSDRESGVpX0M3MnV3T2xlMXB1WElNeXBuZU53UzlES05XeWw4QXFOYnBqbnBUZ2pBclVnd2NYYTk2alJybnNEVWxwU0piNWgxVEZVYlkydHdFcmxpN1hB" },
{ name: "PREF", value: "f6=40000000&tz=America.Sao_Paulo&f7=100" }
];

const app = express();
const port = 3000;
const allowedOrigins = [
    'https://jukebox-wza8.onrender.com',
    'https://jukebox-backend-16sx.onrender.com',
    'http://localhost:5500'
  ];
  
const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Content-Disposition'],
    exposedHeaders: ['Content-Disposition'],
    credentials: true,
    optionsSuccessStatus: 200
  };
const agent = ytdl.createAgent(cookies);
app.use(cors(corsOptions));
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ status: 'backend is running' });
  });

app.post('/download/audio', async (req, res) => {
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