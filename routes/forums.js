const express = require('express');
const got = require('got');
const cheerio = require('cheerio');

const router = express.Router();

function parseForum(html, id) {
  const threads = [];

  const $ = cheerio.load(html);
  $(`#threadbits_forum_${id} tr`).each((i, element) => {
    const title = $('td:nth-child(3) > div > a', element).text();
    let threadId = $('td:nth-child(3) > div > a', element).attr('href');
    if (threadId) {
      threadId = threadId.split('t=').pop() || '';
    }

    const user = $('td:nth-child(3) div.smallfont span', element).text();
    let userId = $('td:nth-child(3) div.smallfont span', element).attr('onclick');
    if (userId) {
      userId = userId.split('u=').pop().split('\', \'').shift() || '';
    }

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
  return threads;
}

router.get('/:id/:page?', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10) || 154;
    const page = parseInt(req.params.page, 10) || 1;

    const response = await got(`forumdisplay.php?f=${id}order=desc&page=${page}`, {
      baseUrl: 'https://www.dslr-forum.de',
      encoding: 'binary',
    });

    const forumJSON = parseForum(response.body, id);
    res.send(JSON.stringify(forumJSON));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
