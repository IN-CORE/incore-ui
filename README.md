Ingestion Service UI -
==================================

**Work in Progress**

Uses react.js, redux, webpack, babel, handsontable

Requirements: [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com).

Install dependencies: `yarn install` or `npm install`

Develop: `export DEPLOY_ENV=develop` and run `yarn start` or `npm start`

Build: `yarn run build` or `npm run build`

Docker
======

To build the container you can use either of these

```
# development
docker build -t incore/frontend:develop .
# production
docker build -t incore/frontend:latest --build-arg DEPLOY_ENV=production .
```

To test docker container:

```
docker run -ti --rm --name frontend -p 8888:80 incore/frontend
```

Now you can connect using the browser at http://localhost:8888/

To update the tags:

```
docker exec frontend /getVersionTags.sh
```
