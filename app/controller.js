'use strict';

const feeds = require('./config/feeds.js');

exports.index = function(req, res) {
    res.status(200).render('index', feeds);
}
