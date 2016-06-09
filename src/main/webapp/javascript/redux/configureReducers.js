import { combineReducers } from "redux-immutable";

export default function configureReducers(reducers) {
    return combineReducers({
        ...reducers,
    });
}
