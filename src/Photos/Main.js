import React from "react";
import PropTypes from "prop-types";
import AllPhotos from "./Photos/AllPhotos";
import TagList from "./Tags/TagList";
import ErrorScreen from "./ErrorScreen/ErrorScreen";
import FullPhoto from "./Photos/FullPhoto";
import Header from "./Header/Header";
import styles from "./Main.css";

const Main = () => (
	<div className={styles.container}>
		<ErrorScreen />
		<TagList />
		<AllPhotos />
		<FullPhoto />
	</div>
);

export default Main;
