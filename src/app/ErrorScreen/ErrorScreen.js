import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./ErrorScreen.css";

const ErrorScreen = ({ errorMessage }) => (
	<div className={errorMessage ? styles.container : styles.containerHidden}>
		<span className={styles.error}>{errorMessage}</span>
	</div>
);

ErrorScreen.propTypes = {
	errorMessage: PropTypes.string.isRequired
};

// Logic

const mapStateToProps = state => ({
	errorMessage: state.fatalError
});

export default connect(mapStateToProps)(ErrorScreen);