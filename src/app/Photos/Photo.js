import React from "react";
import PropTypes from 'prop-types';
import styles from "./Photo.css";

const Photo = ({ photoURL }) => <img src={photoURL} className={styles.photo} />;

Photo.propTypes = {
	photoURL: PropTypes.string.isRequired
};

export default Photo;
