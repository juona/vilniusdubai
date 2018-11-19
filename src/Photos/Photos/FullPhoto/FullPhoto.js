import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleFullPhoto, displayNextFullPhoto, displayPreviousFullPhoto } from "../photosActions";
import styles from "./FullPhoto.css";
import GalleryNavigationButton from "./GalleryNavigationButton";

export const FullPhoto = ({ photoURL, description, onBackgroundClick, onPreviousClick, onNextClick }) => (
  <div className={photoURL ? styles.background : styles.hidden} onClick={onBackgroundClick}>
    <img src={photoURL} className={styles.photo} />
    <span className={styles.caption}>{description}</span>
    <GalleryNavigationButton onClick={() => onPreviousClick()} />
		<GalleryNavigationButton onClick={() => onNextClick()} next={true}/>
  </div>
);

FullPhoto.propTypes = {
  photoURL: PropTypes.string,
  description: PropTypes.string,
  onBackgroundClick: PropTypes.func
};

// Logic

const mapStateToProps = state => ({
  photoURL: state.visibleFullPhoto && state.visibleFullPhoto.name
});

const mapDispatchToProps = dispatch => ({
  onBackgroundClick: () => 
    dispatch(toggleFullPhoto())
	,
	onNextClick: () => dispatch(displayNextFullPhoto()),
	onPreviousClick: () => dispatch(displayPreviousFullPhoto())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullPhoto);
