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

class MapContainer extends React.Component {
  constructor(...args) {
    super(...args);
    this.markers = new Map();
		this.highlightedMarker = {};
		this.markedMarker = {};
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
      position: convertToLatLng(this.props.photosMap[photoName]),
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
  markedPhotoName: PropTypes.string,
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
