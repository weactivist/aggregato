This simple app displays content from a number of feeds from your preferences and displays the content in a single page web app.

# Settings

* Add your preferences to /app/config/*
* Launch with environment variables:
* NODE_ENV: `development`|`production`
* MONGODB_URI: URI to Mongo database
* PORT: Default: `8080`
* FEEDS: Separate each feed with a space character. Example: `https://example1.com/feed https://example2.com/feed`
* TIMEZONE: Timezone to display dates. Default: `Europe/Stockholm`
* CRON: How often to fetch new feed items. Defaults to every 15 mins. Default: `*/15 * * * *`
* LIMIT: Limit the number of items displayed on front page. Default: `24`

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
