import React from "react";
import AllPhotos from "./Photos/AllPhotos";
import TagList from "./Tags/TagList";
import Spinner from "./Spinner/Spinner";
import ErrorScreen from "./ErrorScreen/ErrorScreen";
import styles from "./Main.css";

const Main = () => (
	<div className={styles.container}>
		<Spinner/>
		<ErrorScreen/>
		<header className={styles.header}>
			From Vilnius to Dubai
			<br/>
			One bicycle trip in photos
		</header>
		<div className={styles.tagList}>
			<TagList/>
		</div>
		<div className={styles.photoList}>
			<AllPhotos/>
		</div>
	</div>
);

export default Main;