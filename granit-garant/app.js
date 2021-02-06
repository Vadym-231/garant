var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./src/Mongo/database.json')
var indexRouter = require('./routes/index');
var api = require('./routes/api'),
    keystone = require('keystone'),
    session = require('express-session'),
    body = require('body-parser'),
    flash = require('connect-flash'),
    mongoose = require('mongoose');
const app = express();
app.use(body.urlencoded({
    extended: true
}));
app.use(body.raw());
app.use(body.json());
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);
app.use('/', indexRouter);
app.use(session({
    secret: 'cookieSecret',
    resave: false,
    saveUninitialized: true
}));

keystone.set('routes', app)
keystone.set('mongoose',mongoose)
keystone.init({
    'name': 'Garant',
    'brand': 'Garant',
    'mongo': config.ConnectUrl,
    'session': true,
    'auth': true,
    'user model': 'User',
    'cookie secret': 'thats_new_secret_granit_garant_but_you_dont_know_this21'
});
keystone.import('src/Mongo/mongo_model');
keystone.get('mongoose').connect(keystone.get('mongo'))
keystone.set('port',process.env.PORT || 3000)
keystone.start()
