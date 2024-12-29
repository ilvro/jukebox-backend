const express = require('express');
const ytdl = require("@distube/ytdl-core");
const cors = require('cors');
const https = require('https');

const cookiesO = [
    {
        "domain": ".youtube.com",
        "expirationDate": 1751027420.245324,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "g.a000rwgXDXgKOyWTrkxTEHKycYC5mVJTAstzFsIkXSWGwWwVtJzP3IkWtlETxezFlGODygG9iQACgYKAbESARMSFQHGX2MielacLu-sUmt6F2dEHadJnBoVAUF8yKpPCeTzTFZG8VUlvHmbsXdb0076"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1735477186.519594,
        "hostOnly": false,
        "httpOnly": true,
        "name": "GPS",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "1"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1751027420.245054,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSIDTS",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "sidts-CjIB7wV3sZUneN7kl9XjqYepxpRpRGh9T_iy7REUtiy332MZh7zs-U8FX7XCejEWz9EFeRAA"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1751027420.24572,
        "hostOnly": false,
        "httpOnly": false,
        "name": "SAPISID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "WvNRQ13hsogQX9XI/ANFzmEEtEX6dKpnES"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1751027430.077534,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSIDCC",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AKEyXzUdKFUraM-46duKMZiML2kD70Z-ALwQBP2c1T6K1NUusRSKnrNxlMnib-u0fswfwh5t"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1751027420.245517,
        "hostOnly": false,
        "httpOnly": true,
        "name": "SSID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "Ayogb9dIvlTl4sv-H"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1751027420.24584,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-1PAPISID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "WvNRQ13hsogQX9XI/ANFzmEEtEX6dKpnES"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1751027420.24524,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "g.a000rwgXDXgKOyWTrkxTEHKycYC5mVJTAstzFsIkXSWGwWwVtJzPfFY0ysq-_9YGPMmoUZQl3AACgYKAaQSARMSFQHGX2MiakEh2JPJluFI8jEuU6TjbhoVAUF8yKp-kbkGv84wcf6LVgYmLU3i0076"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1751027420.245928,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-3PAPISID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "WvNRQ13hsogQX9XI/ANFzmEEtEX6dKpnES"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1751027430.07777,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDCC",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AKEyXzUdzfKo4T3l3Paaj-ok6Bq0dNPKZBDUiqcn9Tlye8RFqwVFUKpy8ZB8-Yw8ioNyGtqW"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1751027420.245152,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDTS",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "sidts-CjIB7wV3sZUneN7kl9XjqYepxpRpRGh9T_iy7REUtiy332MZh7zs-U8FX7XCejEWz9EFeRAA"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1751027420.678096,
        "hostOnly": false,
        "httpOnly": true,
        "name": "LOGIN_INFO",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AFmmF2swRAIgc4XllTUIlYnQW_xNx8KA8z5Fbwi-0ZKAFURMeoTybcACIFprH3Gz9iuYHpnbjdP6AWDCU0uMDhApudyCLZS5uyJG:QUQ3MjNmeDg4ZGpDVVM2TWxac2JZLXExX2pZUWExZHF2MldaZWNkallMQ0xnYjk5R2NhdG1xRHotZnRmdXVMUDBjZVRHa0NRcmVXSDRESGVpX0M3MnV3T2xlMXB1WElNeXBuZU53UzlES05XeWw4QXFOYnBqbnBUZ2pBclVnd2NYYTk2alJybnNEVWxwU0piNWgxVEZVYlkydHdFcmxpN1hB"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1736080224.418317,
        "hostOnly": false,
        "httpOnly": false,
        "name": "PREF",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "f6=40000000&tz=America.Sao_Paulo&f7=100"
    },

    {
        "name": "CONSENT",

    }
]

const cookies = cookiesO.map(cookie => ({
    name: cookie.name,
    value: cookie.value
}))

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

const agentOptions = {
    keepAlive: true,
    keepAliveMsecs: 1000,
    maxSockets: 25,
    maxFreeSockets: 10
};


const agent = ytdl.createAgent(cookies, agentOptions);
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