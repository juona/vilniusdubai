import React from "react";
import Link from "./Link";
import styles from "./Home.css";

const Home = () => (
	<div className={styles.container}>
		<div className={styles.menuContainer}>
			<nav className={styles.menu}>
				<Link to="/photos" className={styles.linkPhotos}>
					<span className={styles.textNode}>Gallery</span>
				</Link>
				<Link to="/map" className={styles.linkMap}>
					<span className={styles.textNode}>Map</span>
				</Link>
				<Link to="/stories" className={styles.linkAbout}>
					<span className={styles.textNode}>Stories</span>
				</Link>
			</nav>
		</div>
	</div>
);

export default Home;
