import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleTag, toggleTagList } from "./tagsActions";
import Tag from "./Tag";
import styles from "./TagList.css";

// Presentation

export class TagList extends React.Component {
	componentDidUpdate() {
		// Create honeycomb
		let wrapper = document.getElementById(this.props.tagsWrapperID);

		if (!wrapper) {
			return;
		}

		let tags = Array.from(wrapper.children);

		let position = {
			x: 10,
			y: 10
		};
		let nTags = tags.length;
		let nFirstRow = Math.ceil((-1 + Math.sqrt(1 + 8 * nTags)) / 2);
		let rowItemCount = 0;
		let rowMaxItems = nFirstRow;
		let row = 1;
		tags.forEach(tag => {
			tag.style.left = `${position.x}px`;
			tag.style.top = `${position.y}px`;
			position.x += tag.offsetWidth + 2;
			rowItemCount++;
			if (rowItemCount === rowMaxItems) {
				row++;
				rowItemCount = 0;
				rowMaxItems--;
				position.y += tag.offsetHeight * 0.72;
				position.x = 10 + (row % 2 === 0 ? tag.offsetWidth / 2 + 1 : 0);
			}
		});
	}

	render() {
		return (
			<div
				className={
					this.props.isVisible ? styles.tagList : styles.tagListHidden
				}
				id={this.props.tagsWrapperID}
				onClick={this.props.onBackgroundClick}
			>
				{this.props.tags.map(tag => (
					<Tag
						key={tag}
						tagName={tag}
						onClick={() => this.props.onTagClick(tag)}
					/>
				))}
			</div>
		);
	}
}

TagList.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string).isRequired,
	isVisible: PropTypes.bool.isRequired,
	onTagClick: PropTypes.func.isRequired,
	tagsWrapperID: PropTypes.string,
	onBackgroundClick: PropTypes.func
};

// Logic

const tagsWrapperID = "tagsWrapper";

const mapDispatchToProps = dispatch => ({
	onTagClick: tagName => {
		dispatch(toggleTag(tagName));
	},
	onBackgroundClick: () => {
		dispatch(toggleTagList());
	}
});

const mapStateToProps = state => ({
	tags: state.tags.items,
	tagsWrapperID: tagsWrapperID,
	isVisible: state.isTagListVisible
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TagList);
