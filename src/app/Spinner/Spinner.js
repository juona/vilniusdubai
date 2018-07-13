import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./Spinner.css";

// Presentation

const Spinner = ({ isLoading }) => {
	let className = isLoading ? styles.container : styles.containerHidden;
	console.log("isLoading = " + isLoading);
	return (
		<div className={className}>
			<div className={styles.spinner} />
		</div>
	);
};

Spinner.propTypes = {
	isLoading: PropTypes.bool.isRequired
};

export default Spinner;