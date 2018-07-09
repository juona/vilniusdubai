import React from "react";
import { connect } from 'react-redux';
import Photo from "./Photo";

// Presentation

export const AllPhotos = ({ photos, selectedTags }) => {
	const rows = photos.map(photoURL => {
		return (
			<li key={photoURL}>
				<Photo photoURL={photoURL} />
			</li>
		);
	});

	return <div><span>{selectedTags}</span><ul>{rows}</ul></div>;
};

// Logic

const mapStateToProps = state => ({
	photos: state.photos,
	selectedTags: state.selectedTags
});

export default connect(mapStateToProps)(AllPhotos);