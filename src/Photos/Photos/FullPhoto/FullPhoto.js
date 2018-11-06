import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleFullPhoto } from "../photosActions";
import styles from "./FullPhoto.css";
import NextButton from "./NextButton";

export const FullPhoto = ({ photoURL, description, onBackgroundClick }) => (
  <div className={photoURL ? styles.background : styles.hidden} onClick={onBackgroundClick}>
    <img src={photoURL} className={styles.photo} />
    <span className={styles.caption}>{description}</span>
    <NextButton />
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
  onBackgroundClick: () => {
    dispatch(toggleFullPhoto());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullPhoto);
