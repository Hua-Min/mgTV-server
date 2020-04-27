var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
import cors from 'cors'
import config from './src/config'
import fs from 'fs'
// mongoDB
import './db/db';
import session from 'express-session'
// session 持久化
const mongoStore  = require('connect-mongo')(session);

//手写的中间件
import errorLog from './middle_wares/error_log'
import loginPass from './middle_wares/login_pass'


var usersRouter = require('./routes/users');
var menuRouter = require('./routes/menu');
var sowingRouter = require('./routes/sowing');
var hotRouter = require('./routes/hot');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
// 服务端登陆验证
app.use(session({
    secret: config.secret,
    name: config.name,
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:config.maxAge },
    rolling:true,
    store:new mongoStore({
        url:config.db_url,
        touchAfter: config.maxAge
    })
}));

//记录访问日志
const writeStream = fs.createWriteStream(path.join(__dirname, 'logs/dailyLogs.log'), 'utf8', { flags: 'a' })
app.use(logger('short',{stream:writeStream}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))


// app.use(loginPass)

app.get('/', function (req, res, next) {
  res.end('index')
})

app.use('/user', usersRouter);
app.use('/sowing', sowingRouter);
app.use('/menu', menuRouter);
app.use('/hot', hotRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
