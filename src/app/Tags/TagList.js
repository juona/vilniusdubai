import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleTag } from "./tagsActions";
import Tag from "./Tag";
import styles from "./TagList.css";

// Presentation

const tagsWrapperID = "tagsWrapper";

export class TagList extends React.Component {
	componentDidUpdate() {
		let wrapper = document.getElementById(this.props.tagsWrapperID);

		if (!wrapper) {
			return;
		}

		let tags = Array.from(wrapper.children);

		let position = {
			x: 0,
			y: 0
		};
		let nTags = tags.length;
		let nFirstRow = Math.ceil((-1 + Math.sqrt(1 + 8 * nTags))/2);
		let rowItemCount = 0;
		let rowMaxItems = nFirstRow;
		let row = 1;
		tags.forEach(tag => {
			tag.style.left=`${position.x}px`;
			tag.style.top=`${position.y}px`;
			position.x += tag.offsetWidth + 2;
			rowItemCount++;
			if (rowItemCount === rowMaxItems) {
				row++;
				rowItemCount = 0;
				rowMaxItems--;
				position.y += tag.offsetHeight * 0.72;
				position.x = row % 2 === 0 ? tag.offsetWidth / 2 + 1 : 0;
			}
		});
	}

	render() {
		return (
			<div className={styles.tagList} id={this.props.tagsWrapperID}>
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
	onTagClick: PropTypes.func.isRequired,
	tagsWrapperID: PropTypes.string
};

// Logic

const mapDispatchToProps = dispatch => ({
	onTagClick: tagName => {
		dispatch(toggleTag(tagName));
	}
});

const mapStateToProps = state => ({
	tags: state.tags.items,
	tagsWrapperID: tagsWrapperID
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TagList);
