import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleTag } from "./tagsActions";
import Tag from "./Tag";
import styles from "./TagList.css";

// Presentation

export const TagList = ({ tags, onTagClick }) => (
	<div className={styles.tagList}>
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
	tags: state.tagNames.items
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TagList);
