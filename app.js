const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const hbs = require('hbs');
const session = require('express-session');
const index = require('./routes/index');
const users = require('./routes/users');
const cars = require('./routes/cars');
const lots = require('./routes/lots');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/parking', {useMongoClient:true});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// helpers hbs
hbs.registerHelper('equals', function(val1, val2, options) {
	return val1 === val2 ? options.fn(this) : options.inverse(this);
});


app.use(session({
  secret: 'parkingsystem',
    resave: true,
    saveUninitialized: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function(req, res, next) {
	if(req.body && typeof req.body === 'object' && req.body._method) {
        let method = req.body._method;

		delete req.body._method;

		return method;
	}
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/cars', cars);
app.use('/lots', lots);

app.use(function(req, res, next) {
    const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
