FROM nginx

RUN apt-get -qq update && \
  apt-get -qq -y install curl && \
  apt-get install -qq -y npm && \
  apt-get install -qq -y jq && \
  npm cache clean -f && \
  npm install -g npm && \
  npm install -g n && n latest  # curl is being used in here

# the following line make the new installation of updated nodejs path
RUN PATH="$PATH"

COPY *.* /usr/share/nginx/html/incore-ui/
COPY src /usr/share/nginx/html/incore-ui/src/
COPY test/components /usr/share/nginx/html/incore-ui/test/components/
COPY tools /usr/share/nginx/html/incore-ui/tools/

WORKDIR /usr/share/nginx/html/incore-ui

ENV DEPLOY_ENV="development"

RUN npm install && \
  npm run build

RUN cp -R dist/* /usr/share/nginx/html/. && \
  cp -R src/public /usr/share/nginx/html/public && \
  chmod -R 777 /usr/share/nginx/html/public

COPY landing.conf /etc/nginx/conf.d/default.conf
