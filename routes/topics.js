const express = require('express');
const got = require('got');
const cheerio = require('cheerio');

const router = express.Router();

function parseTopic(html) {
  const topics = [];

  const $ = cheerio.load(html);
  $('#posts > div').each((i, element) => {
    let post = $('[id^="post_message_"]', element).html();
    const time = $('.thead', element).first().text();

    if (i === 0) {
      const postHtml = cheerio.load(post);
      postHtml('div').remove();
      post = postHtml.html();
    }

    const user = {};
    user.name = $('[id^="postmenu_"] .bigusername', element).html();
    user.id = $('[id^="postmenu_"] .bigusername', element).attr('href');
    if (user.id) {
      user.id = parseInt(user.id.split('u=').pop(), 10) || null;
    }

    user.type = $('.alt2 .smallfont', element).html();
    user.op = $('.alt2 .smallfont', element).next().find('span').html() || false;
    user.registration = $('.alt2 .smallfont', element).next().find('div').html();
    const userLength = $('.alt2 .smallfont', element).next().find('div').length;

    if (userLength === 3) {
      user.posts = $('.alt2 .smallfont', element).next().find('div')
        .next()
        .html();
    } else if (userLength === 4) {
      user.location = $('.alt2 .smallfont', element).next().find('div')
        .next()
        .html();
      user.posts = $('.alt2 .smallfont', element).next().find('div')
        .next()
        .next()
        .html();
    }

    if (user.registration) {
      user.registration = user.registration.replace('Registriert seit: ', '');
    }

    if (user.posts) {
      user.posts = parseInt(user.posts.replace('\n\t\t\t\t\tBeitr&#xE4;ge: ', '').replace('\n\t\t\t\t', ''), 10);
    }

    if (user.op) {
      user.op = true;
    }

    if (post) {
      topics.push({
        post,
        user,
        time: time.trim(),
      });
    }
  });

  let pages = $('.pagenav td:last-child a').attr('href');
  if (pages) {
    pages = parseInt(pages.split('page=').pop(), 10) || 1;
  }

  const title = $('meta[name=description]').attr('content');
  return { topics, pages, title };
}

router.get('/:id/:page?', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10) || 1925316;
    const page = parseInt(req.params.page, 10) || 1;

    const url = `showthread.php?t=${id}&page=${page}`;

    const response = await got(url, {
      baseUrl: 'https://www.dslr-forum.de',
      encoding: 'binary',
    });

    const postsJSON = parseTopic(response.body);
    res.send(JSON.stringify(postsJSON));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
