import React from "react";

export class Map extends React.Component {
  componentWillMount() {
    var aScript = document.createElement("script");
    aScript.type = "text/javascript";
    aScript.src = " /*URL Goes Here*/ ";
    document.head.appendChild(aScript);
  }

  initMap() {
    // The location of Uluru
    var uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    var map = new google.maps.Map(document.getElementById("map"), { zoom: 4, center: uluru });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
  }

  render() {
    return <div>PYZDINK NX</div>;
  }
}
