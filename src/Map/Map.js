import React from "react";
import { connect } from "react-redux";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends React.Component {
	getMapBounds(markers = []) {
		const bounds = new this.props.google.maps.LatLngBounds();
		markers.forEach(marker => {
			bounds.extend(marker.props.position)
		})
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

const getVisiblePhotos = (photos, selectedTags, numberOfVisiblePhotos, selectedCountry) => {
  return photos
    .filter(
      photo =>
        photoHasSelectedTags(photo.tags, selectedTags) &&
        isPhotoFromSelectedCountry(photo.tags, selectedCountry)
    )
    .slice(0, numberOfVisiblePhotos);
};

const isPhotoFromSelectedCountry = (tags, selectedCountry) => {
  selectedCountry = selectedCountry.toLowerCase();
  return !selectedCountry || tags.includes(selectedCountry);
};

const photoHasSelectedTags = (photoTags, selectedTags) =>
  Array.from(selectedTags).every(tag => photoTags.includes(tag));

export default connect(state => ({
  photoLocations: getVisiblePhotos(
    state.photos.items,
    state.selectedTags,
    state.numberOfVisiblePhotos,
    state.selectedCountry
  ).map(photo => photo.location)
}))(
  GoogleApiWrapper({
    // TODO Return this from the server.
		apiKey: "AIzaSyAgfJ2OJacwQir3gn-qh_RCYA7Ni4ngZw8"
		// TODO Add a loading container
  })(MapContainer)
);
