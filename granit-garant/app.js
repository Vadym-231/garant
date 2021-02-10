const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const robots = require('express-robots-txt')

const api = require('./routes/api'),
    keystone = require('keystone'),
    session = require('express-session'),
    body = require('body-parser'),
    flash = require('connect-flash'),
    mongoose = require('mongoose');
const app = express();


const config = require('./src/Mongo/database.json')
const indexRouter = require('./routes/index');


app.use(robots({ UserAgent: '*', Disallow: '/', CrawlDelay: '5', Sitemap: '/sitemap.xml' }))

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
    secret: 'thats_new_secret_granit_garant_but_you_dont_know_this21',
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
keystone.set('port',process.env.PORT || 80)
keystone.start()
