const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const port = process.env.PORT || 5000;


const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const forumsRouter = require('./routes/forums');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/forums', forumsRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.get('/backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.listen(port, () => {
  console.log('App listening on port 3000!');
});

module.exports = app;
