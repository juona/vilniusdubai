import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Photo from "./Photo";
import styles from "./AllPhotos.css";
import { displayMorePhotos } from "../../actions";

// Presentation

export class AllPhotos extends React.Component {
	scrollToTop() {
		document.getElementById(this.props.photosWrapperID).scrollTop = 0;
	}

	componentDidUpdate(oldProps) {
		if (Array.from(oldProps.selectedTags).length != Array.from(this.props.selectedTags).length) {
			this.scrollToTop();
		}
	}

	render() {
		const rows = this.props.photos.map(photo => (
			<li key={photo.name} className={styles.listItem}>
				<Photo photoURL={photo.thumbnail} blur={true} />
			</li>
		));

		return (
			<div onScroll={this.props.handleScroll.bind(this)} id={this.props.photosWrapperID} className={styles.wrapper}>
				<ul className={styles.list} id={this.props.photosContentsID}>
					{rows}
				</ul>
			</div>
		);
	}
}

AllPhotos.propTypes = {
	photos: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			tags: PropTypes.arrayOf(PropTypes.string).isRequired
		})
	).isRequired,
	selectedTags: PropTypes.instanceOf(Set).isRequired,
	photosWrapperID: PropTypes.string,
	photosContentsID: PropTypes.string,
	handleScroll: PropTypes.func,
};

// Logic

const photosWrapperID = "photosWrapper";
const photosContentsID = "photosContents";

const mapStateToProps = state => ({
	photos: getVisiblePhotos(state.photos.items, state.selectedTags, state.numberOfVisiblePhotos),
	selectedTags: state.selectedTags,
	photosWrapperID: photosWrapperID,
	photosContentsID: photosContentsID
});

const getVisiblePhotos = (photos, selectedTags, numberOfVisiblePhotos) => {
	return photos.filter(photo => photoHasSelectedTags(photo.tags, selectedTags)).slice(0, numberOfVisiblePhotos);
};

const photoHasSelectedTags = (photoTags, selectedTags) =>
	Array.from(selectedTags).every(tag => photoTags.includes(tag));

const mapDispatchToProps = dispatch => ({
	handleScroll: () => {
		const wrappedElement = document.getElementById(photosContentsID);
		const elementWrapper = document.getElementById(photosWrapperID);
		if (isBottom(wrappedElement, elementWrapper)) {
			dispatch(displayMorePhotos());
		}
	}
});

const isBottom = (element, wrapper) => element.getBoundingClientRect().bottom <= wrapper.getBoundingClientRect().bottom;

export default connect(mapStateToProps, mapDispatchToProps)(AllPhotos);
