import React from "react";
import PropTypes from "prop-types";
import styles from "./Header.css";

const Header = ({ children, className }) => {
	let headerClassName = styles.header;
	if (className) {
		headerClassName += " " + className;
	}
	return (
		<header className={headerClassName}>
			<span className={styles.logo}/>
			{children}
		</header>
	);
};

Header.propTypes = {
	className: PropTypes.string
};

export default Header;
