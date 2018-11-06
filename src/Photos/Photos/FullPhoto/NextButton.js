import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { displayNextFullPhoto } from "../photosActions";
import styles from "./NextButton.css";

const NextButton = ({ left, onClick }) => (
	<div
		className={styles.button}
		onClick={onClick}
	>
		>
	</div>
);

NextButton.propTypes = {
	onClick: PropTypes.func
};

// Logic

const mapDispatchToProps = dispatch => ({
	onClick(event) {
		event.stopPropagation();
		dispatch(displayNextFullPhoto());
	}
});

export default connect(
	() => ({}),
	mapDispatchToProps
)(NextButton);
