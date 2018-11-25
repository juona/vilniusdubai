import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchGoogleMapsLib } from "./mapActions";
import mapStyle from "./MapStyle.json";

export class BaseMapClass extends React.Component {
  static getIcon(svg, { height, width }) {
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      scaledSize: new google.maps.Size(height, width)
    };
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

  componentDidUpdate() {
    if (!this.map) {
      this.initializeMap();
    }
  }

  shouldComponentUpdate(nextProps) {
    return !!nextProps.googleMaps;
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

BaseMapClass.propTypes = {
  onComponentMounted: PropTypes.func.isRequired,
  googleMaps: PropTypes.object
};

export const extendConnectedComponent = MapClass =>
  connect(
    state => ({
      googleMaps: state.googleMaps && state.googleMaps.lib && state.googleMaps.lib.maps
    }),
    dispatch => ({
      onComponentMounted: () => dispatch(fetchGoogleMapsLib())
    })
  )(MapClass);
