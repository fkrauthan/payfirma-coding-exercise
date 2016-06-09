
export default function requireNoAuth(store) {
    return (nextState, replace) => {
        const state = store.getState();
        if (!state.get("auth").get("username") || !state.get("auth").get("password")) {
            replace({
                pathname: "/sign-in",
                state: { nextPathname: nextState.location.pathname },
            });
        }
    };
}
