import Immutable from "immutable";
import request from "superagent-bluebird-promise";
import { push } from "react-router-redux";

import mapErrors from "../utils/mapErrors";

// Actions
export const AUTH_COMPLETED = "auth/AUTH_COMPLETED";
export const CLEAR_AUTH = "auth/CLEAR_AUTH";

// Default state
const defaultState = Immutable.fromJS({
    username: null,
    password: null,
    user: null,
});

// Reducer definition
export default function reducer(state = defaultState, action = {}) {
    switch (action.type) {
        case AUTH_COMPLETED:
            return state.withMutations((ctx) => {
                ctx
                    .set("username", action.username)
                    .set("password", action.password)
                    .set("user", action.user);
            });
        case CLEAR_AUTH:
            return defaultState;
        default:
            return state;
    }
}

// Dump actions
export function authCompleted(username, password, user) {
    return {
        type: AUTH_COMPLETED,
        username,
        password,
        user,
    };
}

export function clearAuth() {
    return {
        type: CLEAR_AUTH,
    };
}

// Smart actions
export function signUp(user) {
    return (dispatch) => {
        return request
            .post("/api/users")
            .accept("json")
            .send(user)
            .then((res) => {
                dispatch(authCompleted(user.username, user.password, res.body));
                dispatch(push("/"));
            })
            .catch((err) => {
                throw mapErrors(err);
            });
    };
}

export function signIn({ username, password }, target) {
    return (dispatch) => {
        return request
            .get("/api/my-user")
            .accept("json")
            .auth(username, password)
            .then((res) => {
                dispatch(authCompleted(username, password, res.body));
                dispatch(push(target));
            })
            .catch((err) => {
                throw mapErrors(err);
            });
    };
}

export function signOut() {
    return (dispatch) => {
        dispatch(clearAuth());
        dispatch(push("/"));
    };
}