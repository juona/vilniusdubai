import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Photo from "./Photo";
import Map from "../../Map/Map";
import { displayMorePhotos, toggleFullPhoto } from "./photosActions";
import styles from "./AllPhotos.css";

// Presentation

const rowMaxHeight = 250;

export class AllPhotos extends React.Component {
  constructor() {
    super();
    this.isScalingPhotos = false;
  }

  scrollToTop() {
    document.getElementById(this.props.photosWrapperID).scrollTop = 0;
  }

  componentDidUpdate(oldProps) {
    if (Array.from(oldProps.selectedTags).length != Array.from(this.props.selectedTags).length) {
      this.scrollToTop();
    }

    this.scalePhotos();
  }

  componentDidMount() {
    //window.onresize = this.scalePhotos.bind(this);
    this.scalePhotos();
  }

  scalePhotos() {
    this.isScalingPhotos = true;
    let wrapper = document.getElementById(this.props.photosContentsID);

    if (!wrapper) {
      this.isScalingPhotos = false;
      return;
    }

    let wrapperWidth = wrapper.offsetWidth;
    let elements = Array.from(wrapper.children);
    let row = [];
    let totalWidth = 0;
    elements.forEach(element => {
      var elementWidth = (element.offsetWidth * rowMaxHeight) / element.offsetHeight;
      row.push(element);
      totalWidth += elementWidth; // Plus margins from css

      if (totalWidth > wrapperWidth) {
        row.forEach((rowItem, index) => {
          let ratio = ((wrapperWidth / totalWidth) * rowMaxHeight) / rowItem.offsetHeight;
          let newHeight = Math.floor(rowItem.offsetHeight * ratio);
          let newWidth = Math.floor(rowItem.offsetWidth * ratio);
          rowItem.style = `height: ${newHeight}px; width: ${newWidth}px;`;
        });
        row = [];
        totalWidth = 0;
      }
    });

    if (row.length > 0) {
      row.forEach(rowItem => {
        let ratio = rowMaxHeight / rowItem.offsetHeight;
        rowItem.style = `height: ${rowItem.offsetHeight * ratio}px; width: ${rowItem.offsetWidth *
          ratio}px;`;
      });
      row = [];
      totalWidth = 0;
    }
    this.isScalingPhotos = false;
  }

  render() {
    const rows = this.props.photos.map((photo, index) => {
      var style = {
        height: photo.height + "px",
        width: photo.width + "px"
      };
      return (
        <li key={photo.name} className={styles.listItem} style={style}>
          <Photo
            photoURL={photo.thumbnail}
            onClick={this.props.onPhotoClick}
            fullPhotoURL={photo.name}
            photoIndex={index}
          />
        </li>
      );
    });

    return (
      <div
        onScroll={this.props.handleScroll.bind(this)}
        id={this.props.photosWrapperID}
        className={styles.wrapper}
      >
        <div className={styles.leftContainer}>
          <ul className={styles.list} id={this.props.photosContentsID}>
            {rows}
          </ul>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.description} />
          <div className={styles.map}>
            <Map />
          </div>
        </div>
      </div>
    );
  }
}

AllPhotos.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired,
  selectedTags: PropTypes.instanceOf(Set).isRequired,
  onPhotoClick: PropTypes.func,
  photosWrapperID: PropTypes.string,
  photosContentsID: PropTypes.string,
  handleScroll: PropTypes.func
};

// Logic

const photosWrapperID = "photosWrapper";
const photosContentsID = "photosContents";

const mapStateToProps = state => ({
  photos: getVisiblePhotos(state.photos.items, state.selectedTags, state.numberOfVisiblePhotos, state.selectedCountry),
  selectedTags: state.selectedTags,
  photosWrapperID: photosWrapperID,
  photosContentsID: photosContentsID
});

const getVisiblePhotos = (photos, selectedTags, numberOfVisiblePhotos, selectedCountry) => {
  return photos
    .filter(photo => photoHasSelectedTags(photo.tags, selectedTags) && isPhotoFromSelectedCountry(photo.tags, selectedCountry))
    .slice(0, numberOfVisiblePhotos);
};

const isPhotoFromSelectedCountry = (tags, selectedCountry) => {
	selectedCountry = selectedCountry.toLowerCase();
	return !selectedCountry || tags.includes(selectedCountry);
};

const photoHasSelectedTags = (photoTags, selectedTags) =>
  Array.from(selectedTags).every(tag => photoTags.includes(tag));

const mapDispatchToProps = dispatch => ({
  handleScroll: () => {
    const wrappedElement = document.getElementById(photosContentsID);
    const elementWrapper = document.getElementById(photosWrapperID);
    if (isBottom(wrappedElement, elementWrapper)) {
      dispatch(displayMorePhotos());
    }
  },
  onPhotoClick: (photoName, index) => {
    dispatch(toggleFullPhoto(photoName, index));
  }
});

const isBottom = (element, wrapper) =>
  element.getBoundingClientRect().bottom <= wrapper.getBoundingClientRect().bottom;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPhotos);
