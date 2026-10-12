# Contributing to incore-ui

Start with the [IN-CORE developer guide](https://github.com/IN-CORE/.github/blob/main/DEVELOPING.md) (dev access, CORS, PR rules).

## Setup

Node (see `engines` in `package.json`).

```bash
npm install
npm run start:dev          # → https://dev.in-core.org, served on http://localhost:3000
```

Run on `localhost:3000` (or `:5000`) — the only origins dev allows via CORS. Pointing a local web client at prod (`tools.in-core.org`) will fail.

Other backends: `export INCORE_REMOTE_HOSTNAME=<url> && npm start`
Local services: see [incore-services CONTRIBUTING](https://github.com/IN-CORE/incore-services/blob/develop/CONTRIBUTING.md#web-clients-incore-ui-studio-playbook-against-local-services).

## Commands

| Task | Command |
|------|---------|
| Build | `npm run build` |
| Test | `npm run test:headless` |
| Lint | `npm run lint` |

## Pull requests

Branch from `develop`, PR to `develop`, link the issue, update `CHANGELOG.md`, lint + tests pass.
