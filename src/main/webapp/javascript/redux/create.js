import { createStore as _createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";

import createCoreReducer from "./createCoreReducer";
import configureReducers from "./configureReducers";

export default function createStore(history, client, data) {
    // Prepare middleware"s
    const middleware = [thunk, routerMiddleware(history)];

    // Prepare final store
    const finalCreateStore = applyMiddleware(...middleware)(_createStore);

    // Prepare reducer
    const rootReducer = configureReducers(createCoreReducer);

    // Prepare store
    return finalCreateStore(rootReducer, data);
}
