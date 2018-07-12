import React from "react";
import AllPhotos from "./Photos/AllPhotos";
import TagList from "./Tags/TagList";
import styles from "./Main.css";

const Main = () => (
	<div>
		<div className={styles.tagList}>
			<TagList/>
		</div>
		<div className={styles.photoList}>
			<AllPhotos/>
		</div>
	</div>
);

export default Main;