import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleTagList } from "../../actions";
import styles from "./Header.css";

const Header = ({ children }) => {
	return (
		<header className={styles.header}>
			<span className={styles.logo}>Vilnius<span/>Dubai</span>
			{children}
		</header>
	);
};

export default Header;