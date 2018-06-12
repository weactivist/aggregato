'use strict';

const mongoose = require('mongoose');
const moment = require('moment-timezone');
const Item = mongoose.model('Item');
const limit = process.env.LIMIT;
const timezone = process.env.TIMEZONE;

exports.index = function(req, res) {
    console.log(limit, timezone);
    Item.find({}).sort({published: -1}).limit(parseInt(limit)).exec(function(error, data) {
        res.status(200).render('index', {items: data, formatDate: function() {
            return function(rawDate, render) {
                let date = render(rawDate);
                date = parseInt(date);
                return moment(date).tz(timezone).fromNow();
            }
        }});
    })
}
