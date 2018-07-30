import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import Menu from "./Menu";
import styles from "./Header.css";

const Header = ({ children, className }) => {
	let headerClassName = styles.header;
	if (className) {
		headerClassName += " " + className;
	}
	return (
		<header className={headerClassName}>
			<span className={styles.logo}/>
			<Route exact path="/photos" component={Menu} />
		</header>
	);
};

Header.propTypes = {
	className: PropTypes.string
};

export default Header;
