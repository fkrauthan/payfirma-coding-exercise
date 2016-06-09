import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Bluebird from "bluebird";
import { Provider } from "react-redux";
import { Router, hashHistory } from "react-router";

import loadingIndicator from "./routes/loadingIndicator";
import syncHistory from "./routes/syncHistory";

import createStore from "./redux/create";
import createRoutes from "./routes/create";


// http://bluebirdjs.com/docs/why-bluebird.html
window.Promise = Bluebird;

// Prepare history
let history = hashHistory;

// Prepare store
const store = createStore(history);

// Sync history and store
history = syncHistory(history, store);

// Setup loading indicator for routing
loadingIndicator(history);

// Prepare component
const component = (
    <Router history={history}>
        {createRoutes(store)}
    </Router>
);

// Render main application
const dest = document.getElementById("app");
ReactDOM.render(
    <Provider store={store} key="provider">
        {component}
    </Provider>,
    dest
);
