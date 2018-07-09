import React from "react";
import PropTypes from "prop-types";

const Tag = ({ onClick, isSelected, tagName }) => (
	<label>
		<input type="checkbox" onChange={onClick} value={tagName} />
		{tagName}
	</label>
);

Tag.propTypes = {
	tagName: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default Tag;
