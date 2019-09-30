FROM nginx

RUN apt-get -qq update && apt-get -qq install git && \
  apt-get install -qq -y npm && npm update npm -g

COPY *.* /usr/share/nginx/html/incore-ui/
COPY src /usr/share/nginx/html/incore-ui/src/
COPY test/components /usr/share/nginx/html/incore-ui/test/components/
COPY tools /usr/share/nginx/html/incore-ui/tools/

WORKDIR /usr/share/nginx/html/incore-ui

RUN npm install && \
  npm run build

RUN cp -R dist/* /usr/share/nginx/html/. && \
  cp -R src/public /usr/share/nginx/html/public && \
  chmod -R 777 /usr/share/nginx/html/public

COPY landing.conf /etc/nginx/conf.d/default.conf
