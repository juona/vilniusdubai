import React from "react";
import PropTypes from "prop-types";
import styles from "./Photo.css";

const Photo = ({ photoURL, fullPhotoURL, photoIndex, onClick }) => (
  <img
    src={photoURL}
    className={styles.photo}
    onClick={onClick.bind(this, fullPhotoURL, photoIndex)}
  />
);

Photo.propTypes = {
  photoURL: PropTypes.string.isRequired,
  fullPhotoURL: PropTypes.string.isRequired,
  photoIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Photo;
