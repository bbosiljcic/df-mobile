const express = require('express');
const got = require('got');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await got('https://www.dslr-forum.de/forumdisplay.php?f=118', {
      encoding: 'binary',
    });
    const threads = [];

    const $ = cheerio.load(response.body);
    $('#threadbits_forum_118 tr').each((i, element) => {
      const title = $('td:nth-cshild(3) > div > a', element).text();
      let threadId = $('td:nth-child(3) > div > a', element).attr('href');
      threadId = threadId.split('t=').pop() || '';

      const user = $('td:nth-child(3) div.smallfont span', element).text();
      let userId = $('td:nth-child(3) div.smallfont span', element).attr('onclick');
      userId = userId.split('u=').pop().split('\', \'').shift() || '';

      const description = $('td:nth-child(3)', element).attr('title');

      const updateTime = $('td:nth-child(4) .time', element).text();

      const replys = $('td:nth-child(5) a', element).text();

      const hits = $('td:nth-child(6)', element).text();

      threads.push({
        threadId,
        title,
        description,
        userId,
        user,
        updateTime,
        replys,
        hits,
      });
    });
    res.send(JSON.stringify(threads));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
