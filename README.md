Incore Service UI
==================================

**Work in Progress**

Uses react.js, redux, webpack, babel, handsontable

Requirements: [Node.js](https://nodejs.org) 22 or newer and npm 10 or newer. CI and Docker use the version in `.nvmrc` (run `nvm use` to match it).

Install dependencies: `npm ci` (installs exactly what is in `package-lock.json`)

Connect with remote development server: `npm run start:dev`
Connect with remote test server: `export INCORE_REMOTE_HOSTNAME=https://incore-tst.ncsa.illinois.edu` and run `npm start`
Connect with remote prod server: `export INCORE_REMOTE_HOSTNAME=https://incore.ncsa.illinois.edu` and run `npm start`
Connect with local server: `export INCORE_REMOTE_HOSTNAME=http://localhost:8080` and run `npm start`

Build: `npm run build`

Docker
======

To build the container you can use either of these

```
# development
docker build -t incore/frontend:develop .
# production
docker build -t incore/frontend:latest .
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
