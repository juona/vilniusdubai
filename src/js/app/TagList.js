import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleTag } from "./actions";
import Tag from "./Tag";

// Presentation

export const TagList = ({ tags, onTagClick }) => (
	<div>
		{tags.map(tagName => (
			<Tag
				key={tagName}
				tagName={tagName}
				onClick={() => onTagClick(tagName)}
			/>
		))}
	</div>
);

TagList.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	onTagClick: PropTypes.func.isRequired
};

// Logic

const mapDispatchToProps = dispatch => ({
	onTagClick: tagName => {
		dispatch(toggleTag(tagName));
	}
});

const mapStateToProps = state => ({
	tags: state.tagNames
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TagList);
