import React from "react";
import PropTypes from "prop-types";
import styles from "./Header.css";

const Header = ({ children, className }) => {
	return (
		<header className={styles.header + " " + className}>
			<span className={styles.logo}>
				Vilnius<span />Dubai
			</span>
			{children}
		</header>
	);
};

Header.propTypes = {
	className: PropTypes.string
};

export default Header;
