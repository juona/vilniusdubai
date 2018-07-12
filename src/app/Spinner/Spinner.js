import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styles from "./Spinner.css";

// Presentation

export const Spinner = ({ isLoading }) => {
	let className = isLoading ? styles.container : styles.containerHidden;
	return (
		<div className={className}>
			<div className={styles.spinner} />
		</div>
	);
};

Spinner.propTypes = {
	isLoading: PropTypes.bool.isRequired
};

// Logic

const mapStateToProps = state => ({
	isLoading: state.photos.isFetching || state.tagNames.isFetching
});

export default connect(mapStateToProps)(Spinner);
