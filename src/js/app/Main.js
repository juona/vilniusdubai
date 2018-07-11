import React from "react";
import Menu from "./Menu";
import AllPhotos from "./AllPhotos";
import styles from "./Main.css";

const Main = () => (
	<div>
		<div className={styles.tagList}>
			<Menu/>
		</div>
		<div className={styles.photoList}>
			<AllPhotos/>
		</div>
	</div>
);

export default Main;