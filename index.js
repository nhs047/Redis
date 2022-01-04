const express = require('express');
const axios = require("axios");
const cors = require("cors");
const Redis = require('redis');

let redisClient;
const DEFAULT_EXPIRATION = 3600;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

(async () => {
    redisClient = Redis.createClient(); //pass url for production
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect();
  })();

app.get('/photos', async (req, res) => {
    const albumId = req.query.albumId;
    const photos = await getOrSetCache(`photos?albumId:${albumId?albumId:'all'}`, async () => {
        const {data} = await axios.get( "https://jsonplaceholder.typicode.com/photos", { params: { albumId }} );
        return data;
    });
    return res.json(photos);
});

app.get("/photos/:id", async(req, res) => {
    const photos = await getOrSetCache(`photos::${req.params.id}`, async () => {
        const {data} = await axios.get( `https://jsonplaceholder.typicode.com/photos/${req.params.id}` );
        return data;
    });
    return res.json(photos);
})

async function getOrSetCache(key, cb) {
    const photos = await redisClient.get(key);
    if(photos != null) return JSON.parse(photos);
    const freshData = await cb();
    await redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
    return freshData;
}

app.listen(3000);