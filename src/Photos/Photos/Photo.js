import React from "react";
import PropTypes from 'prop-types';
import styles from "./Photo.css";

const Photo = ({ photoURL, fullPhotoURL, onClick }) => <img src={photoURL} className={styles.photo} onClick={onClick.bind(this, fullPhotoURL)} />;

Photo.propTypes = {
	photoURL: PropTypes.string.isRequired,
	onClick: PropTypes.func
};

export default Photo;
