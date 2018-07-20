import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import styles from "./Link.css";

const Link = ({ to, className, children, onMouseEnter, onMouseLeave }) => (
	<RouterLink to={to} className={styles.link + (className ? " " + className : "")} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
		{children}
	</RouterLink>
);

Link.propTypes = {
	to: PropTypes.string.isRequired,
	className: PropTypes.string,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func
};

export default Link;
