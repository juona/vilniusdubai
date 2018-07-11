import React from "react";
import PropTypes from 'prop-types';

const Photo = ({ photoURL }) => <img src={photoURL} />;

Photo.propTypes = {
	photoURL: PropTypes.string.isRequired
};

export default Photo;