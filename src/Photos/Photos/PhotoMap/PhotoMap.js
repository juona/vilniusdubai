import PropTypes from "prop-types";
import { BaseMapClass, extendConnectedComponent } from "../../../common/Map/Map";
import cameraIcon from "../../../resources/icons/camera.inline.svg";
import cameraHoverIcon from "../../../resources/icons/camera-hover.inline.svg";

const getCameraIcon = () =>
  BaseMapClass.getIcon(cameraIcon, {
    height: 30,
    width: 30
  });

const getCameraHoverIcon = () =>
  BaseMapClass.getIcon(cameraHoverIcon, {
    height: 35,
    width: 35
  });

class MapContainer extends BaseMapClass {
  constructor(...args) {
    super(...args);
    this.markers = new Map();
    this.highlightedMarker = {};
    this.markedMarker = {};
  }

  getMapBounds() {
    const bounds = new this.props.googleMaps.LatLngBounds();
    for (let marker of this.markers.values()) {
      bounds.extend(marker.getPosition());
    }
    return bounds;
  }

  panMapToHighlightedLocation() {
    clearTimeout(this.panDelay);
    this.panDelay = setTimeout(() => {
      if (this.highlightedMarker && this.highlightedMarker.marker) {
        this.map.panTo(this.highlightedMarker.marker.getPosition());
      }
    }, 500);
  }

  highlightMarker(markerName, photoNameProp, zIndex) {
    const {
      photoName: lastHighlightedPhotoName,
      icon: lastHighlightedIcon,
      zIndex: lastHighlightedZIndex
    } = this[markerName] || {};

    const highlightedPhotoName = this.props[photoNameProp];

    const hasHighlightChanged = highlightedPhotoName !== lastHighlightedPhotoName;

    if (lastHighlightedPhotoName && hasHighlightChanged) {
      const marker = this.markers.get(lastHighlightedPhotoName);
      marker.setIcon(lastHighlightedIcon);
      marker.setZIndex(lastHighlightedZIndex);
      this[markerName] = {};
    }

    if (highlightedPhotoName && hasHighlightChanged) {
      const marker = this.markers.get(highlightedPhotoName);
      this[markerName] = {
        photoName: highlightedPhotoName,
        marker,
        icon: marker.getIcon(),
        zIndex: marker.getZIndex()
      };
      marker.setIcon(getCameraHoverIcon(cameraHoverIcon));
      marker.setZIndex(this.props.googleMaps.Marker.MAX_ZINDEX + zIndex);
      this.panMapToHighlightedLocation();
    }
  }

  highlightMarkers() {
    this.highlightMarker("markedMarker", "markedPhotoName", 1);
    if (this.props.highlightedPhotoName !== this.props.markedPhotoName) {
      this.highlightMarker("highlightedMarker", "highlightedPhotoName", 2);
    }
  }

  createNewMarker(photoName) {
    const marker = new this.props.googleMaps.Marker({
      position: this.props.photosMap[photoName],
      map: this.map,
      icon: getCameraIcon(cameraIcon)
    });
    if (this.props.onMarkerClick) {
      marker.addListener("click", () => {
        this.map.panTo(marker.getPosition());
        this.props.onMarkerClick(photoName);
      });
    }
    return marker;
  }

  createMarkers() {
    this.markers = Object.keys(this.props.photosMap).reduce((markersMap, photoName) => {
      markersMap.set(photoName, this.markers.get(photoName) || this.createNewMarker(photoName));
      return markersMap;
    }, new Map());
    this.highlightMarkers();
  }

  updateComponent() {
    const hasMorePhotosLoaded = this.markers.size !== Object.keys(this.props.photosMap).length;
    this.createMarkers();
    // Can't do the comparison here because at this point markers.length is always equal to
    // photoLocations.length
    if (hasMorePhotosLoaded) {
      this.map.fitBounds(this.getMapBounds());
    }
  }

  componentDidUpdate() {
    super.componentDidUpdate();
    this.updateComponent();
  }

  componentWillUnmount() {
    for (let marker of this.markers.values()) {
      this.props.googleMaps.event.clearInstanceListeners(marker);
    }
  }
}

MapContainer.propTypes = {
  photosMap: PropTypes.object.isRequired,
  highlightedPhotoName: PropTypes.string,
  markedPhotoName: PropTypes.string,
  onMarkerClick: PropTypes.func
};

MapContainer.defaultProps = {
  photos: []
};

export default extendConnectedComponent(MapContainer);
