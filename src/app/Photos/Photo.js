import React from "react";
import PropTypes from 'prop-types';
import styles from "./Photo.css";

const Photo = ({ photoURL, blur }) => {
	let blurElement;
	if (blur) {
		blurElement = <img src={photoURL} className={styles.blur} />
	}
	return (
		<div>
			{blurElement}
			<img src={photoURL} className={styles.photo} />
		</div>
	);
};

Photo.propTypes = {
	photoURL: PropTypes.string.isRequired
};

export default Photo;
