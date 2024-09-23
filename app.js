var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('./public/hasher.js')
require('./public/handypassport.js')
require('./public/serialize.js')
var logger = require('morgan');


var cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const mongoose = require('mongoose')

var app = express();
mongoose.connect('mongodb+srv://h632097:yahya666@cluster0.xv5zm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(console.log("database connect"))
//mongoose.connect('mongodb://localhost:27017').then(console.log("database connect"))

let corsOptions = {
  origin: [ 'http://localhost:5173', 'http://localhost:5175','https://yahya0morsy.github.io/note-front', 'https://yahya0morsy.github.io','http://localhost:8000','https://yahya0morsy.github.io/note-front/#/try' ],
  credentials: true 
};
app.use(cors(corsOptions));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));



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
