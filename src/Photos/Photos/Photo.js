import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleHoveringPhoto } from "./photosActions";
import styles from "./Photo.css";

const Photo = ({
  style,
  photoURL,
  fullPhotoURL,
  photoIndex,
  onClick,
  onPhotoMouseEnter,
  onPhotoMouseLeave
}) => (
  <li className={styles.listItem} style={style}>
    <img src={photoURL} className={styles.photo} />
    <div
      className={styles.overlay}
      onClick={onClick.bind(this, fullPhotoURL, photoIndex)}
      onMouseEnter={() => onPhotoMouseEnter(fullPhotoURL)}
      onMouseLeave={() => onPhotoMouseLeave()}
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
  onClick: PropTypes.func.isRequired
};

export default connect(
  () => ({}),
  dispatch => ({
    onPhotoMouseEnter: photoName => dispatch(toggleHoveringPhoto(photoName)),
    onPhotoMouseLeave: () => dispatch(toggleHoveringPhoto())
  })
)(Photo);
