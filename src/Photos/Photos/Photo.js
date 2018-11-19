import React from "react";
import PropTypes from "prop-types";
import styles from "./Photo.css";

const Photo = ({ style, photoURL, fullPhotoURL, photoIndex, onClick, onHover }) => (
  <li className={styles.listItem} style={style}>
    <img src={photoURL} className={styles.photo} />
    <div
      className={styles.overlay}
      onClick={onClick.bind(this, fullPhotoURL, photoIndex)}
      onMouseEnter={() => onHover(fullPhotoURL)}
      onMouseLeave={() => onHover()}
    />
  </li>
);

Photo.propTypes = {
  style: PropTypes.shape({
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
  }),
  photoURL: PropTypes.string.isRequired,
  fullPhotoURL: PropTypes.string.isRequired,
  photoIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired
};

export default Photo;
