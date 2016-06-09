import Immutable from "immutable";
import request from "superagent-bluebird-promise";

import mapErrors from "../utils/mapErrors";

// Actions
export const START_LOADING = "store/START_LOADING";
export const STOP_LOADING = "store/STOP_LOADING";
export const FINISHED_LOADING = "store/FINISHED_LOADING";

// Default state
const defaultState = Immutable.fromJS({
    loading: false,
    error: null,
    laptops: [],
});

// Reducer definition
export default function reducer(state = defaultState, action = {}) {
    switch (action.type) {
        case START_LOADING:
            return state.withMutations((ctx) => {
                ctx
                    .set("loading", true)
                    .set("error", null);
            });
        case STOP_LOADING:
            return state.withMutations((ctx) => {
                ctx
                    .set("loading", false)
                    .set("error", action.error);
            });
        case FINISHED_LOADING:
            return state.withMutations((ctx) => {
                ctx
                    .set("loading", false)
                    .set("error", null)
                    .set("laptops", Immutable.fromJS(action.laptops));
            });
        default:
            return state;
    }
}

// Dump actions
export function startLoading() {
    return {
        type: START_LOADING,
    };
}

export function stopLoading(error) {
    return {
        type: STOP_LOADING,
        error,
    };
}

export function finishedLoading(laptops) {
    return {
        type: FINISHED_LOADING,
        laptops,
    };
}

// Smart actions
export function load() {
    return (dispatch) => {
        dispatch(startLoading());

        return request
            .get("/api/laptops")
            .accept("json")
            .then((res) => {
                dispatch(finishedLoading(res.body.data));
            })
            .catch((err) => {
                dispatch(stopLoading(mapErrors(err)._error));
            });
    };
}
