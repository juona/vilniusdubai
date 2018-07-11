import React from "react";
import { render } from "react-dom";
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Router from "./router";
import reducers from "./app/reducers";
import { fetchTags, fetchPhotos } from "./app/actions";
import styles from "./index.css";

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

store.dispatch(fetchTags());

store.dispatch(fetchPhotos(0, 10));

const appContainer = document.createElement("div");
appContainer.setAttribute("id", "router");
document.body.appendChild(appContainer);

var app = (
	<Provider store={store}>
		<Router />
	</Provider>
);

render(app, appContainer);
