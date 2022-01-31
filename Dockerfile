FROM node:alpine3.15 AS base
ENV NODE_ENV=production
WORKDIR /usr/src/ilove2code
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

FROM base AS dev
ENV NODE_ENV=development
ENV PATH=/usr/src/ilove2code/node_modules/.bin/:$PATH
WORKDIR /usr/src/ilove2code/app
RUN apk update \
  && apk upgrade \
  && apk search curl \
  && apk --no-cache add curl
RUN npm install --only=development
CMD [ "nodemon", "--config", "nodemon.json", "--inspect=0.0.0.0:9229", "src/index.ts"]