import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./App";

const appContainer = document.createElement("div");
appContainer.setAttribute("id", "app");
document.body.appendChild(appContainer);
ReactDOM.render(<App />, appContainer);