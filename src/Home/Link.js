import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import styles from "./Link.css";

const Link = ({ to, className, children }) => (
	<RouterLink to={to} className={styles.link + (className ? " " + className : "")}>
		{children}
	</RouterLink>
);

Link.propTypes = {
	to: PropTypes.string.isRequired,
	className: PropTypes.string
};

export default Link;
