const FeedParser = require('feedparser');
const request = require('request');
const sha1 = require('sha1');
const striptags = require('striptags');
const mongoose = require('mongoose');
const Item = mongoose.model('Item');

module.exports = function() {
    let feeds = process.env.FEEDS.split(' ');

    feeds.forEach(feed => {
        let req = request(feed);
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
                let matches = item.description.match(/<img.+?src=\"([^"]+)\"/);
                var img = '';

                if(item.image.hasOwnProperty('url')) {
                    img = item.image.url;
                }
                else if(matches) {
                    img = matches[1];
                }

                let feedItem = new Item({
                    title: striptags(item.title),
                    description: striptags(item.description),
                    summary: striptags(item.summary),
                    link: item.link,
                    published: Date.parse(item.pubDate),
                    image: img,
                    guid: guid
                });

                let upsertData = feedItem.toObject();

                delete upsertData._id;

                Item.update({guid: guid}, upsertData, {upsert: true}, function(error) {
                    if(error) {
                        console.log(error);
                    }
                });
            }
        });
    });
};
