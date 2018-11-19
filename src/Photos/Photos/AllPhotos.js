import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import Photo from "./Photo";
import Map from "./Map/Map";
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
    this.state = {
      hoveringPhoto: null
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
  }

  componentDidMount() {
    //window.onresize = this.scalePhotos.bind(this);
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

  render() {
    const rows = this.props.photos.map((photo, index) => {
      return (
        <Photo
          key={photo.name}
          style={{
            height: photo.height + "px",
            width: photo.width + "px"
          }}
          photoURL={photo.thumbnail}
          onClick={this.props.onPhotoClick}
          fullPhotoURL={photo.name}
          photoIndex={index}
          onHover={photoName => this.setHoveringPhoto(photoName)}
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
            <Description photo={this.state.hoveringPhoto} />
          </div>
          <div className={styles.map}>
            <Map
              highlightedPhotoLocation={
                this.state.hoveringPhoto && this.state.hoveringPhoto.location
              }
              photoLocations={this.props.photos.map(photo => photo.location)}
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
