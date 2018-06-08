const FeedParser = require('feedparser');
const request = require('request');
const feeds = require('./config/feeds.js');
const sha1 = require('sha1');
const mongoose = require('mongoose');
const Item = mongoose.model('Item');

module.exports = function() {
    feeds.forEach(feed => {
        let req = request(feed.url);
        let feedparser = new FeedParser();

        req.on('error', function(error){
            console.log(error);
        });

        req.on('response', function(res) {
            var stream = this;

            if(res.statusCode !== 200) {
                this.emit('error', new Error('Bad status code'));
            }
            else {
                stream.pipe(feedparser);
            }
        });

        feedparser.on('error', function(error){
            console.log(error);
        });

        feedparser.on('readable', function(){
            let stream = this;
            let meta = this.meta;
            var item;

            while(item = stream.read()) {
                if(!item.guid) {
                    continue;
                }

                let guid = sha1(item.guid);

                let feedItem = new Item({
                    title: item.title,
                    description: item.description,
                    summary: item.summary,
                    link: item.link,
                    published: item.pubDate,
                    guid: item.guid
                });

                let upsertData = feedItem.toObject();

                delete upsertData._id;

                Item.update({_id: feedItem._id}, upsertData, {upsert: true}, function(error) {
                    if(error) {
                        console.log(error);
                    }
                });
            }
        });
    });
};
