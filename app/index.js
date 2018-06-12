'use strict';

const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const CronJob = require('cron').CronJob;
const Item = require('./models/item.js');
const controller = require('./controller.js');
const Import = require('./import.js');
const cron = process.env.CRON;
const timezone = process.env.TIMEZONE;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

new Import();

new CronJob(cron, function() {
    new Import();
}, null, true, timezone);

let app = express();

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', './views');

app.use(express.static('dist'));

if( process.env.NODE_ENV === 'development' ) {
    app.disable('view cache');
}

app.route('/')
    .get(controller.index);

app.listen(process.env.PORT, function(){
  console.log('App listening on port ' + process.env.PORT);
});
