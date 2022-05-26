const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { exceptionHandlers } = require('./lib/exception-handlers');
const history = require('connect-history-api-fallback');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
if (['local'].includes(process.env.NODE_ENV)) app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/users', usersRouter);

// Everything else should be handled by Vue.js
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// Exception handling
if (['prod', 'stage'].includes(process.env.NODE_ENV)) 
  app.use(exceptionHandlers['prod'])
else
  app.use(exceptionHandlers['non-prod'])

module.exports = app;
