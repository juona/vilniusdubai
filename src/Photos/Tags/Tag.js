import React from "react";
import PropTypes from "prop-types";
import styles from "./Tag.css";

const Tag = ({ onClick, isSelected, tagName }) => (
	<label className={styles.label}>
		<input
			type="checkbox"
			onChange={onClick}
			value={tagName}
			className={styles.input}
		/>
		<span className={styles.rotatedContainer}>
			<span className={styles.button}>{tagName}</span>
			<span className={styles.rotated}/>
		</span>
	</label>
);

Tag.propTypes = {
	tagName: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default Tag;
