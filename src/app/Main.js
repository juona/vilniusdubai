import React from "react";
import { connect } from "react-redux";
import AllPhotos from "./Photos/AllPhotos";
import TagList from "./Tags/TagList";
import ErrorScreen from "./ErrorScreen/ErrorScreen";
import Header from "./Header/Header";
import { toggleTagList } from "../actions";
import styles from "./Main.css";

export const Main = ({ onTagsClick }) => (
	<div className={styles.container}>
		<ErrorScreen />
		<Header onTagsClick={onTagsClick}/>
		<TagList />
		<div className={styles.photoList}>
			<AllPhotos />
		</div>
	</div>
);

// Logic

const mapDispatchToProps = dispatch => ({
	onTagsClick: () => {
		dispatch(toggleTagList());
	}
});

export default connect(() => ({}),
	mapDispatchToProps
)(Main);