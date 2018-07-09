import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Main from "./app/Main";

const Router = () =>
	<HashRouter>
		<Route exact path="/" component={Main} />
	</HashRouter>
;

export default Router