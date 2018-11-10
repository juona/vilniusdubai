import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={7}
        initialCenter={{
          lat: 49.8687472,
          lng: 25.4021809
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
	// TODO Return this from the server.
  apiKey: 'AIzaSyAgfJ2OJacwQir3gn-qh_RCYA7Ni4ngZw8'
})(MapContainer);
