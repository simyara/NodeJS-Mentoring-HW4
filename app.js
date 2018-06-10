var express = require('express');
var app = express();


let router = require('./routes/api');

app.use('/', router)

module.exports = app;