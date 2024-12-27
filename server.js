const express = require('express');
const ytdl = require("@distube/ytdl-core");
const cors = require('cors');
const https = require('https');
const cookies = [
    {
        name: 'APISID', value: 'f8l6T6h7uJUm32xe/AU4sCfJlo1BLUlZwY',
        name: 'GPS', value: '1',
        name: 'HSID', value: 'Ai4e9SWryawPISD5O',
        name: 'LOGIN_INFO', value: 'AFmmF2swRAIgfugKN4-qFoYbvIZRzgasxDjs0ZIhhnTK-vC-Xpi5-hECIFGUjNecjWfroXpbXaD_udcJLRjMMsJkqP4Uelmj44E0:QUQ3MjNmeHJacFhBaXdSRThEMFlSSV9nXy1wdVZPSU4tSXNHOGZ2SFFwRzlfR20xdGpPLVZHUUd6SGZMT0NDRWEzTE1ITjdaeElocGhVMHg1bUVCbXVQZFJaSjVLdmlaQjQ3MGJZb0JZWWtRRHdXX2EzOFFvTUNibTBzbi05OWRMQzZZVVFnU2toSUp5ZFdULXhuamtWVHVnNjZ3Yms2Nnd3',
        name: 'PREF', value: 'f6=40000000&tz=America.Sao_Paulo&f7=100',
        name: 'SAPISID', value: 'CUCtaknP1xB-LYqw/AtK74RUi_vIgrZC3r',
        name: 'SID', value: 'g.a000rwgXDeLlCKOHRRkCDY23sRXs-TipLyQdTtNEEfqW-cudbs4dQ_GaqfoRBEbg7b2GkQFgyQACgYKAeASARMSFQHGX2Mi-E4XjPD-WGWXOudVnM3uYBoVAUF8yKrXCGiTAhtko4MAMwZedSm90076',
        name: 'SIDCC', value: 'AKEyXzXjbMOyfj5uT-OeGAPe9lQn6RU0IixABc8loDSFdFJnI351UZadYRYr7r-lrDyUUrEW',
        name: 'SSID', value: 'ARK5IWG5m5M0yLmHy',
        name: 'VISITOR_INFO1_LIVE', value: 'or5dxEj6saw',
        name: 'VISITOR_PRIVACY_METADATA', value: 'CgJCUhIEGgAgMg%3D%3D',
        name: 'YSC', value: 'uMhUNR-xNMw',
    }
]
const env = 'https://jukebox-wza8.onrender.com';
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