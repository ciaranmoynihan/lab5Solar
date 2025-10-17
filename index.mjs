// node index.mjs


import express from 'express';
const solarSystem = (await import('npm-solarsystem')).default;
import fetch from 'node-fetch';

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
   let url = 'https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system';
   let response = await fetch(url);
   let data = await response.json();
   console.log(data);
   let randomImage = data.hits[Math.floor(Math.random() * data.hits.length)].webformatURL;
   res.render('home.ejs', {randomImage})
});

app.get('/planet', (req, res) => {
    let planetName = req.query.planetName;
    
    let planetInfo = solarSystem['get' + planetName]();
    console.log(planetInfo);
   res.render('planetInfo.ejs', {planetInfo, planetName})
});


app.get('/NASAPOD', async (req, res) => {
   res.render('NASAPOD.ejs')
});



app.listen(3000, () => {
   console.log('server started');
});