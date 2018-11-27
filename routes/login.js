const express = require('express');
const got = require('got');
const FormData = require('form-data');

const form = new FormData();
const router = express.Router();

// TODO change to post
router.get('/', async (req, res) => {
  try {
    form.append('vb_login_username', 'acidr4in');
    form.append('vb_login_md5password_utf', '');
    form.append('do', 'login');
    form.append('securitytoken', 'guest');

    const response = await got.post('login.php?do=login', {
      body: form,
      baseUrl: 'https://www.dslr-forum.de',
    });


    const cookies = response.headers['set-cookie'];
    console.log('login cookies', cookies);
    res.send('GOT HASH');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
