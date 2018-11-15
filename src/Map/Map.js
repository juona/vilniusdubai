import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { getVisiblePhotos } from "../Photos/Photos/photosSelectors";

class MapContainer extends React.Component {
  getMapBounds(markers = []) {
    const bounds = new this.props.google.maps.LatLngBounds();
    markers.forEach(marker => {
      bounds.extend(marker.props.position);
    });
    return bounds;
  }

  createMarkers() {
    const { lat, long } = this.props.highlightedPhotoLocation || {};
    this.markers = (this.props.photoLocations || []).map((photoLocation, index) => {
      const props = {};
      if (photoLocation.lat === lat && photoLocation.long === long) {
        props.icon = {
          url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569"
				};
				props.zIndex = this.props.google.maps.Marker.MAX_ZINDEX + 1;
      }
      return (
        <Marker
          key={`${index} ${photoLocation.lat} ${photoLocation.long}`}
          position={{ lat: photoLocation.lat, lng: photoLocation.long }}
          {...props}
        />
      );
    });
	}
	
	shouldComponentUpdate(nextProps) {
		// I have to avoid rerenders on every small change of the state
		// Perhaps drop this lib altogether
		//return false;
	}

  render() {
    this.createMarkers();
    return (
      <Map
        google={this.props.google}
        minZoom={4}
        bounds={this.getMapBounds(this.markers)}
        onReady={() => this.forceUpdate()}
      >
        {this.markers}
      </Map>
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

export default connect(state => ({
  photoLocations: getVisiblePhotos(state).map(photo => photo.location),
  highlightedPhotoLocation: (state.photos.items.get(state.hoveringPhoto) || {}).location
}))(
  GoogleApiWrapper({
    // NOTE Too much hassle returning this key from the server.
    // And since it is UI code anyway, it does not really matter.
    apiKey: "AIzaSyAgfJ2OJacwQir3gn-qh_RCYA7Ni4ngZw8"
    // TODO Add a loading container
  })(MapContainer)
);
