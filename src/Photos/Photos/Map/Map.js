import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchGoogleMapsLib } from "./mapActions";
import mapStyle from "./MapStyle.json";
import cameraIcon from "../../../resources/icons/camera.svg";
import cameraHoverIcon from "../../../resources/icons/camera-hover.svg";

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
    this.markers = [];
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
    this.markers.forEach(marker => {
      bounds.extend(marker.getPosition());
    });
    return bounds;
  }

  doesMarkerMatchLocation(marker, { lat, long } = {}) {
    const { lat: markerLat, long: markerLong } = getLatLongFromMarker(marker);
    return Math.abs(markerLat) - lat < 0.00001 && Math.abs(markerLong - long) < 0.00001;
  }

  highlightMarker(marker, lastHighlightedMarker) {
    if (this.doesMarkerMatchLocation(marker, this.props.highlightedPhotoLocation || {})) {
      const { lat, long } = getLatLongFromMarker(marker);
      this.highlightedMarker = {
        icon: marker.getIcon(),
        zIndex: marker.getZIndex(),
        lat,
        long
      };

      marker.setIcon(getCameraHoverIcon(cameraHoverIcon));
      marker.setZIndex(this.props.googleMaps.Marker.MAX_ZINDEX + 1);
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

  createNewMarker(photoLocation) {
    const marker = new this.props.googleMaps.Marker({
      position: convertToLatLng(photoLocation),
      map: this.map,
      icon: getCameraIcon(cameraIcon)
    });
    if (this.props.onMarkerClick) {
      marker.addListener("click", () => this.props.onMarkerClick(getLatLongFromMarker(marker)));
    }
    return marker;
  }

  createMarkers() {
    const lastHighlightedMarker = this.highlightedMarker;
    this.highlightedMarker = {};
    this.markers = this.props.photoLocations.map(photoLocation =>
      this.highlightMarker(
        this.getMarkerForLocation(photoLocation) || this.createNewMarker(photoLocation),
        lastHighlightedMarker
      )
    );
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
    const hasMorePhotosLoaded = this.markers.length !== this.props.photoLocations.length;
    this.createMarkers();
    // Can't do the comparison here because at this point markers.length is always equal to
    // photoLocations.length
    if (hasMorePhotosLoaded) {
      this.map.fitBounds(this.getMapBounds());
    }
  }

  componentWillUnmount() {
    this.markers.forEach(marker => this.props.googleMaps.event.clearInstanceListeners(marker));
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
  }),
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
