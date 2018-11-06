import React from "react";
import PropTypes from "prop-types";
import AllPhotos from "./Photos/AllPhotos";
import TagList from "./Tags/TagList";
import FullPhoto from "./Photos/FullPhoto/FullPhoto";
import styles from "./Main.css";

const Main = () => (
	<div className={styles.container}>
		<TagList />
		<AllPhotos />
		<FullPhoto />
	</div>
);

export default Main;
