import React from "react";
import styles from "./About.scss";

export default ({ isShowing }) => (
  <article className={`${styles.article} ${isShowing ? styles.show : ""}`}>
    This is good stuff.
  </article>
);
