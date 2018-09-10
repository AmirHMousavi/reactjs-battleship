import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import { loadState, saveState } from "./configureStore";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./reducers/rootReducer";

const persistedState = loadState();

/** create store with persisted state and thunk&chrome extention as enhancer */
const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

/** subscribe store to listen to state changes and act respectively */
store.subscribe(() => {
  saveState(store.getState());
});

if (!localStorage.BatltleShipScores) {
  localStorage.setItem("BatltleShipScores", JSON.stringify({}));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
