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

  getMarkers() {
    return (this.props.photoLocations || []).map((photoLocation, index) => (
      <Marker
        key={`${index} ${photoLocation.lat} ${photoLocation.long}`}
        position={{ lat: photoLocation.lat, lng: photoLocation.long }}
      />
    ));
  }

  render() {
    const markers = this.getMarkers();
    return (
      <Map
        google={this.props.google}
        minZoom={4}
        bounds={this.getMapBounds(markers)}
        onReady={() => this.forceUpdate()}
      >
        {markers}
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
  ).isRequired
};

export default connect(state => ({
  photoLocations: getVisiblePhotos(state).map(photo => photo.location)
}))(
  GoogleApiWrapper({
    // NOTE Too much hassle returning this key from the server.
    // And since it is UI code anyway, it does not really matter.
    apiKey: "AIzaSyAgfJ2OJacwQir3gn-qh_RCYA7Ni4ngZw8"
    // TODO Add a loading container
  })(MapContainer)
);
