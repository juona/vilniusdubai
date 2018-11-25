import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleFullPhoto, displayNextFullPhoto, displayPreviousFullPhoto } from "../photosActions";
import styles from "./FullPhoto.css";
import GalleryNavigationButton from "./GalleryNavigationButton";

export class FullPhoto extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    if (e.keyCode === 37) {
      this.props.onPreviousClick();
    } else if (e.keyCode === 39) {
      this.props.onNextClick();
    } else if (e.keyCode === 27) {
			this.props.onBackgroundClick();
		}
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  render() {
    return (
      <div
        className={this.props.photoURL ? styles.background : styles.hidden}
        onClick={this.props.onBackgroundClick}
      >
        <img src={this.props.photoURL} className={styles.photo} />
        <span className={styles.caption}>{this.props.description}</span>
        <GalleryNavigationButton onClick={() => this.props.onPreviousClick()} />
        <GalleryNavigationButton onClick={() => this.props.onNextClick()} next={true} />
      </div>
    );
  }
}

FullPhoto.propTypes = {
  photoURL: PropTypes.string,
  description: PropTypes.string,
  onBackgroundClick: PropTypes.func
};

// Logic

const mapStateToProps = state => ({
  photoURL: state.visibleFullPhoto && state.visibleFullPhoto.name
});

const mapDispatchToProps = dispatch => ({
  onBackgroundClick: () => dispatch(toggleFullPhoto()),
  onNextClick: () => dispatch(displayNextFullPhoto()),
  onPreviousClick: () => dispatch(displayPreviousFullPhoto())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullPhoto);
