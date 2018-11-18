import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getVisiblePhotos } from "../Photos/Photos/photosSelectors";
import mapStyle from "./MapStyle.json";
import cameraIcon from "../resources/icons/camera.svg";
import cameraHoverIcon from "../resources/icons/camera-hover.svg";

// NOTE Too much hassle returning this key from the server.
// And since it is UI code anyway, it does not really matter.
const API_KEY = "AIzaSyAgfJ2OJacwQir3gn-qh_RCYA7Ni4ngZw8";
const MAPS_API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;

const getIcon = (svg, { height, width }) => ({
  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
  scaledSize: new google.maps.Size(height, width)
});

const getCameraIcon = () => getIcon(cameraIcon, {
	height: 30,
	width: 30
});

const getCameraHoverIcon = () => getIcon(cameraHoverIcon, {
	height: 35,
	width: 35
});

const convertToLatLng = ({ lat, long }) => ({
  lat,
  lng: long
});

class MapContainer extends React.Component {
  constructor(...args) {
    super(...args);
    this.markers = [];
    this.highlightedMarker = {};
  }

  componentDidMount() {
    (window.google ? Promise.resolve() : this.loadScript()).then(() => {
      this.initializeMap();
    });
  }

  loadScript() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = MAPS_API_URL;
    document.body.appendChild(script);
    return new Promise(resolve => script.addEventListener("load", resolve));
  }

  initializeMap() {
    this.map = new window.google.maps.Map(this.refs.mapContainer, {
      zoom: 4,
      center: { lat: 0, lng: 0 },
      styles: mapStyle
    });
    this.updateComponent();
  }

  getMapBounds() {
    const bounds = new window.google.maps.LatLngBounds();
    this.markers.forEach(marker => {
      bounds.extend(marker.getPosition());
    });
    return bounds;
  }

  doesMarkerMatchLocation(marker, { lat, long } = {}) {
    const { lat: markerLat, lng: markerLong } = marker.getPosition();
    return Math.abs(markerLat()) - lat < 0.00001 && Math.abs(markerLong() - long) < 0.00001;
  }

  highlightMarker(marker, lastHighlightedMarker) {
    if (this.doesMarkerMatchLocation(marker, this.props.highlightedPhotoLocation || {})) {
      const { lat, lng } = marker.getPosition();
      this.highlightedMarker = {
        icon: marker.getIcon(),
        zIndex: marker.getZIndex(),
        lat: lat(),
        long: lng()
      };

      marker.setIcon(getCameraHoverIcon(cameraHoverIcon));
      marker.setZIndex(window.google.maps.Marker.MAX_ZINDEX + 1);
      this.map.panTo(convertToLatLng(this.props.highlightedPhotoLocation));
    } else if (this.doesMarkerMatchLocation(marker, lastHighlightedMarker)) {
      marker.setIcon(lastHighlightedMarker.icon);
      marker.setZIndex(lastHighlightedMarker.zIndex);
    }
    return marker;
  }

  getMarkerForLocation(location) {
    return this.markers.find(marker => this.doesMarkerMatchLocation(marker, location));
  }

  createMarkers() {
    const lastHighlightedMarker = this.highlightedMarker;
    this.highlightedMarker = {};
    this.markers = this.props.photoLocations.map(photoLocation =>
      this.highlightMarker(
        this.getMarkerForLocation(photoLocation) ||
          new window.google.maps.Marker({
            position: convertToLatLng(photoLocation),
            map: this.map,
            icon: getCameraIcon(cameraIcon)
          }),
        lastHighlightedMarker
      )
    );
  }

  componentDidUpdate() {
    this.updateComponent();
  }

  updateComponent() {
    const shouldFitToBounds = this.markers.length !== this.props.photoLocations.length;
    this.createMarkers();
    // Can't do the comparison here because here markers.length will always equal
    // photoLocations.length
    if (shouldFitToBounds) {
      this.map.fitBounds(this.getMapBounds());
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
  photoLocations: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired
    })
  ).isRequired,
  highlightedPhotoLocation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    long: PropTypes.number.isRequired
  })
};

MapContainer.defaultProps = {
  photoLocations: []
};

export default connect(state => ({
  photoLocations: getVisiblePhotos(state).map(photo => photo.location),
  highlightedPhotoLocation: (state.photos.items.get(state.hoveringPhoto) || {}).location
}))(MapContainer);
