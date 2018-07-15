import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Main from "./Photos/Main";
import Home from "./Home/Home";

const Router = () =>
	<HashRouter>
		<Switch>
			<Route exact path="/photos" component={Main} />
			<Route exact path="/" component={Home} />
		</Switch>
	</HashRouter>
;

export default Router