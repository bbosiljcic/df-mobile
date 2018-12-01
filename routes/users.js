const express = require('express');
const got = require('got');
const cheerio = require('cheerio');

const htmlTrim = require('../helpers/htmlTrim');

const router = express.Router();

function parseUser(html) {
  const $ = cheerio.load(html);
  let online = $('h1 img').attr('alt');

  if (online.includes('online')) {
    online = true;
  } else {
    online = false;
  }

  const name = $('h1').text();
  const type = $('h2').text();

  const lastOnline = {};
  lastOnline.time = $('#last_online .time').text();
  $('#last_online .shade').remove();
  $('#last_online .time').remove();
  lastOnline.date = $('#last_online').html();

  if (lastOnline.date) {
    lastOnline.date = htmlTrim(lastOnline.date);
  }

  const registered = $('#stats_mini .profilefield_list dd').first().text();
  const posts = $('#stats_mini .profilefield_list dd').last().text();

  const about = {};

  $('#aboutme .profilefield_list dd').each((i, element) => {
    let key = 'none';
    switch ($(element).prev().text()) {
      case 'Biografie':
        key = 'bio';
        break;
      case 'Geschlecht':
        key = 'gender';
        break;
      case 'Beruf':
        key = 'occupation';
        break;
      case 'Interessen':
        key = 'interestes';
        break;
      case 'Ausrüstung':
        key = 'gear';
        break;
      case 'Postleitzahl':
        key = 'postal';
        break;
      case 'Wohnort':
        key = 'location';
        break;
      case 'Land':
        key = 'country';
        break;
      default:
        break;
    }

    about[key] = htmlTrim($(element).text());
  });

  return {
    name: htmlTrim(name),
    online,
    type,
    lastOnline,
    registered,
    posts,
    about,
  };
}

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10) || 1;
    const url = `member.php?u=${id}`;

    const response = await got(url, {
      baseUrl: 'https://www.dslr-forum.de',
      encoding: 'binary',
      headers: {
        Cookie: '__utma=161704867.1913328156.1505409415.1510357348.1510608945.56; mbmcookie=1; dslrlastvisit=1537049277; dslrlastactivity=0; dslruserid=61087; dslrpassword=d945e703e15d458e45c05f6a91ba4bea; __gads=ID=17321b1e068e2991:T=1543261447:S=ALNI_MaxVNV6N2aXSi1jlzACeOuQ2qSzCQ; dslrsessionhash=8ee8f3a9c89e82c4c4434bda537e8932',
      },
    });

    const userJSON = parseUser(response.body);
    userJSON.id = id;
    res.send(JSON.stringify(userJSON));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
