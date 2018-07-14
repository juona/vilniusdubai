import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleTagList } from "../../actions";
import styles from "./Header.css";

export const Header = ({ onTagsClick }) => {
	let button;

	if (onTagsClick) {
		button = <span className={styles.tagsButton} onClick={onTagsClick} />;
	}

	return (
		<header className={styles.header}>
			{button}
			From Vilnius to Dubai
			<br />
			One bicycle trip in photos
		</header>
	);
};

Header.propTypes = {
	onTagsClick: PropTypes.func
};

// Logic

const mapDispatchToProps = dispatch => ({
	onTagsClick: () => {
		dispatch(toggleTagList());
	}
});

export default connect(
	() => ({}),
	mapDispatchToProps
)(Header);
