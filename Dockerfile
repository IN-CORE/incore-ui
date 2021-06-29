# ----------------------------------------------------------------------
# First stage, compile application
# ----------------------------------------------------------------------

FROM node:14 AS builder

WORKDIR /usr/src/app

# specify which service to use
ARG INCORE_REMOTE_HOSTNAME=""
ENV INCORE_REMOTE_HOSTNAME=${INCORE_REMOTE_HOSTNAME}

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

# ----------------------------------------------------------------------
# Second stage, final image
# ----------------------------------------------------------------------

FROM nginx:alpine

RUN apk add --no-cache jq

COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html/
COPY src/public /usr/share/nginx/html/public/
COPY src/tags /usr/share/nginx/html/tags/
COPY getVersionTags.sh /
COPY landing.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html/tags
