const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const redis = require('redis');
const redisClient = redis.createClient();
const RedisStore = require('connect-redis')(session);

const app = express();
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'secret';

const indexRouter = require('./src/router/index');
const errorHandler = require('./src/middlewares/error.middleware');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

const storeConfig = {
  host: 'localhost',
  port: 6379,
  client: redisClient,
  ttl: 300
};


app.use(session({
  store:  new RedisStore(storeConfig),
  secret: COOKIE_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
  })
);


app.use(cookieParser(COOKIE_SECRET));
app.use(indexRouter);

app.use(errorHandler); 

module.exports = app;