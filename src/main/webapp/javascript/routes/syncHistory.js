import { syncHistoryWithStore } from "react-router-redux";

export default (history, store) => syncHistoryWithStore(history, store, {
    selectLocationState: (state) => state.get("routing").toJS(),
});
