const express = require('express');
const got = require('got');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const response = await got('https://motherfuckingwebsite.com/');

    // console.log(response.body);
    const $ = cheerio.load(response.body);
    const h1 = $('h1').text();
    res.send(JSON.stringify({ title: h1 }));
  } catch (error) {
    console.log(error.response.body);
  }

});

module.exports = router;
