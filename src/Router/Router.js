import React from "react";
import PropTypes from "prop-types";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header/Header";
import ServerError from "./ServerError/ServerError";
import Photos from "../Photos/Main";
import Home from "../Home/Home";
import styles from "./Router.css";

export const Router = ({ serverError }) => (
	<HashRouter>
		<div className={styles.container}>
			<Header />
			<Switch>
				<Route
					exact
					path="/server-error"
					render={() => <ServerError errorMessage={serverError} />}
				/>
				{serverError && <Redirect to="/server-error" />}
				
				<Route exact path="/" component={Home} />
				<Route exact path="/photos" component={Photos} />
				<Route exact path="/map" component={Map} />
			</Switch>
		</div>
	</HashRouter>
);

// Logic

Router.propTypes = {
	serverError: PropTypes.string
};

const mapStateToProps = state => ({
	serverError: state.fatalError
});

export default connect(mapStateToProps)(Router);
