import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HeaderTemplate from "../../common/Header/Header";
import { toggleTagList } from "../../actions";
import styles from "./Header.css";

export const Header = ({ onTagsClick }) => {
	let button;
	if (onTagsClick) {
        button = <span className={styles.tagsButton} onClick={onTagsClick} />;
    }
	return (
		<HeaderTemplate>
			{button}
		</HeaderTemplate>
	);
};

Header.propTypes = {
	onTagsClick: PropTypes.func
};

// Logic

const mapDispatchToProps = dispatch => ({
	onTagsClick: () => {
		dispatch(toggleTagList());
	}
});

export default connect(
	() => ({}),
	mapDispatchToProps
)(Header);