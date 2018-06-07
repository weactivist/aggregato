FROM node:10

RUN mkdir -p /usr/src/app

COPY app/ /usr/src/app

WORKDIR /usr/src/app

RUN ["npm", "install", "--production"]

CMD ["node", "index.js"]
