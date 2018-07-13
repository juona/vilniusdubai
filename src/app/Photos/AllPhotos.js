import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SpinnerTemplate from "../Spinner/Spinner";
import Photo from "./Photo";
import styles from "./AllPhotos.css";
import { fetchPhotos } from "../../actions";

// Presentation

export const AllPhotos = ({ photos, photosWrapperID, photosContentsID, handleScroll }) => {
	const rows = Object.entries(photos).map(photoData => (
		<li key={photoData[0]} className={styles.listItem}>
			<Photo photoURL={photoData[1].photoName} blur={true} />
		</li>
	));

	return (
		<div onScroll={handleScroll} id={photosWrapperID} className={styles.wrapper}>
			<Spinner/>
			<ul className={styles.list} id={photosContentsID}>
				{rows}
			</ul>
		</div>
	);
};

AllPhotos.propTypes = {
	photos: PropTypes.objectOf(
		PropTypes.shape({
			photoName: PropTypes.string.isRequired,
			tags: PropTypes.arrayOf(PropTypes.string).isRequired
		})
	).isRequired,
	photosWrapperID: PropTypes.string,
	photosContentsID: PropTypes.string,
	handleScroll: PropTypes.func,
};

// Logic

const photosWrapperID = "photosWrapper";
const photosContentsID = "photosContents";

const mapStateToProps = state => ({
	photos: getVisiblePhotos(state.photos.items, state.selectedTags),
	photosWrapperID: photosWrapperID,
	photosContentsID: photosContentsID
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

const mapDispatchToProps = dispatch => ({
	handleScroll: () => {
		const wrappedElement = document.getElementById(photosContentsID);
		const elementWrapper = document.getElementById(photosWrapperID);
		if (isBottom(wrappedElement, elementWrapper)) {
			dispatch(fetchPhotos());
		}
	}
});

const isBottom = (element, wrapper) => element.getBoundingClientRect().bottom <= wrapper.getBoundingClientRect().bottom;

export default connect(mapStateToProps, mapDispatchToProps)(AllPhotos);

const mapStateToSpinnerProps = state => ({
	isLoading: state.photos.isFetching
});

const Spinner = connect(mapStateToSpinnerProps)(SpinnerTemplate);
