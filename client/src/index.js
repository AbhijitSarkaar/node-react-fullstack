import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";

import App from "./components/App";

const store = createStore(reducers, {}, applyMiddleware());

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
