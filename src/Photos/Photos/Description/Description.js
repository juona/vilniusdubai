import React from "react";
import PropTypes from "prop-types";
import styles from "./Description.css";

let lastDescription;

const Description = ({ photo }) => {
	lastDescription = photo ? photo.description : lastDescription;
  return (
    <section className={styles.container}>
      <div className={`${styles.text} ${photo ? styles.contents : ""}`}>{photo && photo.description || lastDescription}</div>
    </section>
  );
};

Description.propTypes = {
  photo: PropTypes.shape({
		description: PropTypes.string
	})
};

export default Description;
