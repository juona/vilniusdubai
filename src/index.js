import React from "react";
import { render } from "react-dom";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";

import Router from "./Router/Router";
import reducers from "./reducers";
import { fetchPhotos } from "./Photos/Photos/photosActions";
import { fetchTags } from "./Photos/Tags/tagsActions";
import "./global.css";

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

const store = createStore(reducers, applyMiddleware(thunkMiddleware, logger));

store.dispatch(fetchTags());

store.dispatch(fetchPhotos());

const appContainer = document.createElement("div");
appContainer.setAttribute("id", "router");
document.body.appendChild(appContainer);

var app = (
  <Provider store={store}>
    <Router />
  </Provider>
);

render(app, appContainer);
