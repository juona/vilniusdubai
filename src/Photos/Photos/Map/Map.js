import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchGoogleMapsLib } from "./mapActions";
import mapStyle from "./MapStyle.json";
import cameraIcon from "../../../resources/icons/camera.inline.svg";
import cameraHoverIcon from "../../../resources/icons/camera-hover.inline.svg";

const getIcon = (svg, { height, width }) => ({
  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
  scaledSize: new google.maps.Size(height, width)
});

const getCameraIcon = () =>
  getIcon(cameraIcon, {
    height: 30,
    width: 30
  });

const getCameraHoverIcon = () =>
  getIcon(cameraHoverIcon, {
    height: 35,
    width: 35
  });

const convertToLatLng = ({ lat, long }) => ({
  lat,
  lng: long
});

const getLatLongFromMarker = marker => {
  const { lat, lng } = marker.getPosition();
  return {
    lat: lat(),
    long: lng()
  };
};

class MapContainer extends React.Component {
  constructor(...args) {
    super(...args);
    this.markers = new Map();
    this.highlightedMarker = {};
  }

  componentDidMount() {
    this.props.onComponentMounted();
  }

  initializeMap() {
    this.map = new this.props.googleMaps.Map(this.refs.mapContainer, {
      zoom: 4,
      center: { lat: 0, lng: 0 },
      styles: mapStyle
    });
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
      if (this.highlightedMarker) {
        this.map.panTo(this.highlightedMarker.marker.getPosition());
      }
    }, 500);
  }

  highlightMarker() {
    const {
      photoName: lastHighlightedPhotoName,
      icon: lastHighlightedIcon,
      zIndex: lastHighlightedZIndex
    } = this.highlightedMarker || {};
    this.highlightedMarker = {};
    this.markers.forEach((marker, photoName) => {
      if (photoName === this.props.highlightedPhotoName && photoName !== lastHighlightedPhotoName) {
        this.highlightedMarker = {
          photoName,
          marker,
          icon: marker.getIcon(),
          zIndex: marker.getZIndex()
        };
        marker.setIcon(getCameraHoverIcon(cameraHoverIcon));
        marker.setZIndex(this.props.googleMaps.Marker.MAX_ZINDEX + 1);
        this.panMapToHighlightedLocation();
      } else if (photoName === lastHighlightedPhotoName) {
        marker.setIcon(lastHighlightedIcon)
        marker.setZIndex(lastHighlightedZIndex);
      }
    });
  }

  createNewMarker(photoName) {
    const marker = new this.props.googleMaps.Marker({
      position: convertToLatLng(this.props.photosMap[photoName]),
      map: this.map,
      icon: getCameraIcon(cameraIcon)
    });
    if (this.props.onMarkerClick) {
      marker.addListener("click", () => this.props.onMarkerClick(photoName));
    }
    return marker;
  }

  createMarkers() {
    this.markers = Object.keys(this.props.photosMap).reduce((markersMap, photoName) => {
      markersMap.set(photoName, this.markers.get(photoName) || this.createNewMarker(photoName));
      return markersMap;
    }, new Map());
    this.highlightMarker();
  }

  componentDidUpdate() {
    if (!this.map) {
      this.initializeMap();
    }
    this.updateComponent();
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.googleMaps;
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

  componentWillUnmount() {
    for (let marker of this.markers.values()) {
      this.props.googleMaps.event.clearInstanceListeners(marker);
    }
  }

  render() {
    // NOTE Inline style is necessary here!
    return (
      <div
        ref="mapContainer"
        style={{
          position: "absolute",
          height: "100%",
          width: "100%"
        }}
      />
    );
  }
}

MapContainer.propTypes = {
  photosMap: PropTypes.object.isRequired,
  highlightedPhotoName: PropTypes.string,
  onMarkerClick: PropTypes.func,
  onComponentMounted: PropTypes.func.isRequired,
  googleMaps: PropTypes.object
};

MapContainer.defaultProps = {
  photos: []
};

export default connect(
  state => ({
    googleMaps: state.googleMaps && state.googleMaps.lib && state.googleMaps.lib.maps
  }),
  dispatch => ({
    onComponentMounted: () => dispatch(fetchGoogleMapsLib())
  })
)(MapContainer);
