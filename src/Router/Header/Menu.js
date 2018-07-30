import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Menu.css";

const Menu = () => {
	return (
		<nav className={styles.nav}>
			<ul className={styles.ul}>
				<li className={styles.li}><NavLink to="/photos">Gallery</NavLink></li>
				<li className={styles.li}><NavLink to="/map">Map</NavLink></li>
				<li className={styles.li}><NavLink to="/about">Stories</NavLink></li>
			</ul>
		</nav>
	);
};

Menu.propTypes = {
};

export default Menu;
