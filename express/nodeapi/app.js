var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Conectamos la BBDD
require('./lib/connectMongoose');

// Cargamos los modelos para que Mongoose los conozca
require('./models/Agente');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// middleware de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Middlewares de mi aplicación web
 */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

/**
 * Middlewares de mi api
 */
app.use( '/apiV1/agentes', require('./routes/apiV1/agentes') );

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

  // Si es una petición de API, respondemos con JSON
  if( isAPI(req) ) {
    res.json( { success: false, error: err.message } );
    return;
  } else {
    res.render('error');
  }  
});

function isAPI(req) {
  return req.originalUrl.indexOf( '/apiV' ) === 0;
}

module.exports = app;
