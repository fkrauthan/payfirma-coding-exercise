import Immutable, { Map, List } from "immutable";
import { routerReducer as routingReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import storeReducer from "./storeReducer";
import orderReducer from "./orderReducer";

function wrapNonImmutableReducer(reducer) {
    return (state, action) => {
        const isImmutableState = state && (Map.isMap(state) || List.isList(state));
        return Immutable.fromJS(reducer(isImmutableState ? state.toJS() : state, action));
    };
}

export default {
    routing: wrapNonImmutableReducer(routingReducer),
    form: wrapNonImmutableReducer(formReducer),

    auth: authReducer,
    store: storeReducer,
    order: orderReducer,
};
