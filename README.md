This project is work in progress. Check back later or contribute.

# Development

## Setup
$ cp .env-example .env

$ cd app/

$ npm install

## Run
$ docker-compose up

# Production

## Build
$ docker build -t aggregato ./

## Run
$ docker up aggregato

# Contribute

## Build CSS
$ cd app/

$ npm run sass
