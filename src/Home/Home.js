import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.css";

const Home = () => (
	<div className={styles.container}>
		<nav className={styles.menu}>
			<Link to="/photos" className={styles.link}>
				<div className={styles.title}>Gallery</div>
				<div className={styles.subtitle}>One bicycle trip in photographs.</div>
			</Link>
			<Link to="/stories" className={styles.link}>
				<div className={styles.title}>Stories</div>
				<div className={styles.subtitle}></div>
			</Link>
		</nav>
	</div>
);

export default Home;
