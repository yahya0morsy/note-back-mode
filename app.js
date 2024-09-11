var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./public/local-strategy.js');
var passport = require('passport');
var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { Session } = require('inspector');
const session = require('express-session');
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo');
var app = express();

mongoose.connect('mongodb+srv://h632097:yahya666@cluster0.xv5zm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(console.log("database connect"))
let corsOptions = {
  origin: [ 'http://localhost:5173', 'http://localhost:5175','https://yahya0morsy.github.io/note-front', "https://yahya0morsy.github.io" ],
  credentials: true 
};
app.use(cors(corsOptions));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'your-secret-key',
 resave: false,
 saveUninitialized: false,
 cookie:{maxAge: 6000*6000,
  sameSite:'none',
  withCredentials:true
},
 store: MongoStore.create(
  {client: mongoose.connection.getClient()}
 )
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', indexRouter);
app.use('/users', usersRouter);



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
