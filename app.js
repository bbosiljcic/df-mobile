const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const port = process.env.PORT || 5000;

const loginRouter = require('./routes/login');
const forumsRouter = require('./routes/forums');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const app = express();

const apiPrefix = '/api';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use(`${apiPrefix}/login`, loginRouter);
app.use(`${apiPrefix}/forums`, forumsRouter);
app.use(`${apiPrefix}/posts`, postsRouter);
app.use(`${apiPrefix}/users`, usersRouter);

app.get(`${apiPrefix}/test`, (req, res) => {
  res.send({ express: 'backend connected' });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
