import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import styles from "./Map.css"

class MapContainer extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
				style={{
					left: "25%",
					right: "25%",
					top: "10%",
					bottom: "10%"
				}}
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
