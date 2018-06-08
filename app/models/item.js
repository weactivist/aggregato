'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    published: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    guid: {
        type: String,
        validate: {
            validator: function(v) {
                if(!v) {
                    return true;
                }

                return /^[a-zA-Z0-9]{40}$/.test(v);
            },
            message: '{VALUE} is not a valid GUID!'
        }
    }
});

module.exports = mongoose.model('Item', ItemSchema);
