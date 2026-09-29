import { createBrowserHistory } from "history";

// Single shared history instance.
//
// react-router v3 exported a `browserHistory` singleton that components could
// import and push to directly. v5 has no such export, so we create one here and
// hand it to the <Router> in index.js. Components keep calling
// `browserHistory.push(...)` exactly as before, only the import path changes.
const browserHistory = createBrowserHistory();

export { browserHistory };
export default browserHistory;
