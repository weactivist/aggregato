'use strict';

const mongoose = require('mongoose');
const feeds = require('./config/feeds.js');
const Item = mongoose.model('Item');

exports.index = function(req, res) {
    Item.find({}, function(error, data) {
        res.status(200).render('index', {items: data});
    });
}
