import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Photo from "./Photo";
import styles from "./AllPhotos.css";

// Presentation

export const AllPhotos = ({ photos, selectedTags }) => {
	const visiblePhotos = getVisiblePhotos(photos, selectedTags);
	const rows = Object.entries(visiblePhotos).map(photoData => (
		<li key={photoData[0]} className={styles.listItem}>
			<Photo photoURL={photoData[1].photoName} />
		</li>
	));

	return (
		<ul className={styles.list}>{rows}</ul>
	);
};

AllPhotos.propTypes = {
	photos: PropTypes.objectOf(PropTypes.shape({
		photoName: PropTypes.string.isRequired,
		tags: PropTypes.arrayOf(PropTypes.string).isRequired
	})).isRequired,
	selectedTags: PropTypes.instanceOf(Set).isRequired
};

// Logic

const mapStateToProps = state => ({
	photos: state.photos.items,
	selectedTags: state.selectedTags
});

const getVisiblePhotos = (photos, selectedTags) => {
	let visiblePhotos = Object.assign({}, photos);
	Object.entries(photos).forEach(photoData => {
		if (!photoHasSelectedTags(photoData[1].tags, selectedTags)) {
			delete visiblePhotos[photoData[0]];
		}
	});
	return visiblePhotos;
};

const photoHasSelectedTags = (photoTags, selectedTags) =>
	Array.from(selectedTags).every(tag => photoTags.includes(tag));

export default connect(mapStateToProps)(AllPhotos);
