import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Header from "./Header/Header";
import ServerError from "./ServerError/ServerError";
import Photos from "../Photos/Main";
import Home from "../Home/Home";
import styles from "./Router.css";

const Router = () =>
	<HashRouter>
		<div className={styles.container}>
			<Header />
			<Switch>
				<Route exact path="/photos" component={Photos} />
				<Route exact path="/" component={Home} />
				<Route exact path="/server-error" component={ServerError} />
			</Switch>
		</div>
	</HashRouter>
;

export default Router