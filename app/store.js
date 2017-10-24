import { createStore, compose } from "redux";

import rootReducer from "./reducers";

const store = createStore(
  rootReducer,
  compose(
    typeof window === "object" && window.devToolsExtension !== "undefined"
      ? window.devToolsExtension()
      : f => f // reduxDevTools
  )
);

export default store;
