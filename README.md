This simple app displays content from a number of feeds from your preferences and displays the content in a single page web app.

# Settings

* Add your preferences to /app/config/*
* Launch with environment variables:
* __NODE_ENV__: `development`|`production`
* __MONGODB_URI__: URI to Mongo database
* __PORT__: Default: `8080`
* __FEEDS__: Separate each feed with a space character. Example: `https://example1.com/feed https://example2.com/feed`
* __TIMEZONE__: Timezone to display dates. Default: `Europe/Stockholm`
* __CRON__: How often to fetch new feed items. Defaults to every 15 mins. Default: `*/15 * * * *`
* __LIMIT__: Limit the number of items displayed on front page. Default: `24`
* __TITLE__: Page title. Default: `Aggregato`

# Development

## Setup
$ cp .env-example .env

$ cd app/

$ npm install

## Run
$ docker-compose up

# Contribute

## Build CSS
$ cd app/

$ npm run sass
