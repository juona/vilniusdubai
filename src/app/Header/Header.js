import React from "react";
import PropTypes from "prop-types";
import styles from "./Header.css";

const Header = ({ onTagsClick }) => {
	let button;

	if (onTagsClick) {
		button = <span className={styles.tagsButton} onClick={onTagsClick}></span>;
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

export default Header;

// Logic
