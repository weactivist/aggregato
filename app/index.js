'use strict';

const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const controller = require('./controller.js');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

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
