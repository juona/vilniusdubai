import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./ServerError.css";

const ServerError = ({ errorMessage }) => (
	<div className={errorMessage ? styles.container : styles.containerHidden}>
		<span className={styles.error}>{errorMessage}</span>
	</div>
);

ServerError.propTypes = {
	errorMessage: PropTypes.string.isRequired
};

// Logic

const mapStateToProps = state => ({
	errorMessage: state.fatalError
});

export default connect(mapStateToProps)(ServerError);