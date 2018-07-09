import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Router from "./router";
import reducers from "./app/reducers";

const store = createStore(reducers);

const appContainer = document.createElement("div");
appContainer.setAttribute("id", "router");
document.body.appendChild(appContainer);

var app = (
	<Provider store={store}>
		<Router />
	</Provider>
);

render(app, appContainer);
