import React from "react";
import styles from "./Spinner.scss";

export default () => (
  <div className={styles.container}>
    <div className={styles.spinner}>
      <div className={styles.dot1} />
      <div className={styles.dot2} />
    </div>
  </div>
);
