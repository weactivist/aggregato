'use strict';

const mongoose = require('mongoose');
const moment = require('moment-timezone');
const feeds = require('./config/feeds.js');
const config = require('./config/app.js');
const Item = mongoose.model('Item');

exports.index = function(req, res) {
    Item.find({}).sort({published: -1}).limit(config.limit).exec(function(error, data) {
        res.status(200).render('index', {items: data, formatDate: function() {
            return function(rawDate, render) {
                let date = render(rawDate);
                date = parseInt(date);
                return moment(date).tz(config.timezone).fromNow();
            }
        }});
    })
}
