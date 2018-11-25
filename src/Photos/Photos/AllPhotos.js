import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import animateScrollTo from "animated-scroll-to";
import Photo from "./Photo";
import Map from "./PhotoMap/PhotoMap";
import Description from "./Description/Description";
import { displayMorePhotos, toggleFullPhoto } from "./photosActions";
import { getVisiblePhotos } from "./photosSelectors";
import styles from "./AllPhotos.css";
import "!style-loader!css-loader!react-perfect-scrollbar/dist/css/styles.css";

// Presentation

const rowMaxHeight = 250;

export class AllPhotos extends React.Component {
  constructor() {
    super();
    this.markedPhotoTimer = null;
    this.state = {
      hoveringPhoto: null,
      markedPhoto: null
    };
  }

  scrollToTop() {
    this.refs.photosWrapper.scrollTop = 0;
  }

  componentDidUpdate(oldProps) {
    if (Array.from(oldProps.selectedTags).length != Array.from(this.props.selectedTags).length) {
      this.scrollToTop();
    }

    this.scalePhotos();

    if (this.state.markedPhoto) {
      // The element is an ugly hack but I am forced to use it...
      const { element } = this.refs.scrollbar._ps;
      animateScrollTo(this.refs[this.state.markedPhoto.name], {
        element,
        offset: -(element.offsetHeight - rowMaxHeight) / 2
      });
    }
  }

  componentDidMount() {
    this.scalePhotos();
    this.refs.scrollbar.updateScroll();
  }

  scalePhotos() {
    let wrapper = this.refs.photosContents;

    if (!wrapper) {
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
        row.forEach(rowItem => {
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
  }

  setHoveringPhoto(photoName) {
    this.setState({
      hoveringPhoto: this.props.photosMap.get(photoName)
    });
  }

  unmarkPhoto() {
    this.setState({
      markedPhoto: null
    });
  }

  markPhoto(photoName) {
    this.setState({
      markedPhoto: this.props.photosMap.get(photoName)
    });
    if (this.markedPhotoTimer) {
      clearTimeout(this.markedPhotoTimer);
    }
    this.markedPhotoTimer = setTimeout(() => this.unmarkPhoto(), 1500);
  }

  render() {
    const rows = this.props.photos.map((photo, index) => {
      return (
        <Photo
          key={photo.name}
          ref={photo.name}
          style={{
            height: photo.height + "px",
            width: photo.width + "px"
          }}
          photoURL={photo.thumbnail}
          onClick={this.props.onPhotoClick}
          fullPhotoURL={photo.name}
          photoIndex={index}
          onHover={photoName => this.setHoveringPhoto(photoName)}
          isMarked={this.state.markedPhoto && this.state.markedPhoto.name === photo.name}
        />
      );
    });

    return (
      <div className={styles.wrapper}>
        <div ref="photosWrapper" className={styles.leftContainer}>
          <PerfectScrollbar
            ref="scrollbar"
            className={styles.scrollbar}
            onYReachEnd={() => this.props.onScrollEnd()}
          >
            <ul className={styles.list} ref="photosContents">
              {rows}
            </ul>
          </PerfectScrollbar>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.description}>
            <Description photo={this.state.hoveringPhoto || this.state.markedPhoto} />
          </div>
          <div className={styles.map}>
            <Map
              highlightedPhotoName={this.state.hoveringPhoto && this.state.hoveringPhoto.name}
              markedPhotoName={this.state.markedPhoto && this.state.markedPhoto.name}
              photosMap={this.props.photos.reduce((locationsMap, photo) => {
                locationsMap[photo.name] = photo.location;
                return locationsMap;
              }, {})}
              onMarkerClick={photoName => this.markPhoto(photoName)}
            />
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
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      description: PropTypes.string
    })
  ).isRequired,
  selectedTags: PropTypes.instanceOf(Set).isRequired,
  onPhotoClick: PropTypes.func,
  onScrollEnd: PropTypes.func
};

// Logic

const mapStateToProps = state => ({
  photos: getVisiblePhotos(state),
  selectedTags: state.selectedTags,
  photosMap: state.photos.items
});

const mapDispatchToProps = dispatch => ({
  onScrollEnd: () => {
    dispatch(displayMorePhotos());
  },
  onPhotoClick: (photoName, index) => {
    dispatch(toggleFullPhoto(photoName, index));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPhotos);
