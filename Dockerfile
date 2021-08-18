FROM node:14-alpine

LABEL app="mono-api"

RUN apk add --upgrade \
    busybox=1.31.1-r10 \ 
    --no-cache

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

CMD [ "node", "dist/main" ]
