import React from "react";
import PropTypes from "prop-types";
import styles from "./GalleryNavigationButton.css";

const Button = ({ next, onClick }) => (
  <div
    className={`${styles.button} ${next ? styles.next : styles.previous}`}
    onClick={e => {
      e.stopPropagation();
      onClick();
    }}
  />
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  next: PropTypes.bool
};

export default Button;
