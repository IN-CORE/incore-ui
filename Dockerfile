FROM node:12 AS builder

WORKDIR /usr/src/app

# development or production
ARG DEPLOY_ENV="development"
ENV DEPLOY_ENV="${DEPLOY_ENV:-development}"

# copy only package for caching purposes
COPY package*.json /usr/src/app/
COPY tools/ /usr/src/app/tools/
RUN npm install

# copy rest of application
COPY .babelrc .eslintrc .istanbul.yml *.js /usr/src/app/
COPY test /usr/src/app/test/
COPY src /usr/src/app/src/

# build application
RUN npm run build

FROM nginx:alpine

RUN apk add --no-cache jq


COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html/
COPY src/public /usr/share/nginx/html/public/
COPY src/tags /usr/share/nginx/html/tags/
COPY getVersionTags.sh /

WORKDIR /usr/share/nginx/html/tags
