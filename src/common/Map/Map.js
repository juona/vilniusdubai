import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { fetchGoogleMapsLib } from "./mapActions";
import mapStyle from "./MapStyle.json";
import styles from "./Map.scss";

export class BaseMapClass extends React.Component {
  static getIcon(svg, { height, width }) {
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      scaledSize: new google.maps.Size(height, width)
    };
  }

  constructor(...args) {
    super(...args);
    this.state = {
      isMapLoaded: false
    };
  }

  componentDidMount() {
    if (!this.props.googleMaps) {
      this.props.loadGoogleMaps();
    } else {
      this.initializeMap();
    }
  }

  initializeMap() {
    this.map = new this.props.googleMaps.Map(this.refs.mapContainer, {
      zoom: 4,
      center: { lat: 0, lng: 0 },
      styles: mapStyle
		});
		
		// An extra timeout to reduce the time of empty screen
    google.maps.event.addListenerOnce(this.map, "idle", () =>
      setTimeout(() => this.setState({
        isMapLoaded: true
      }), 250)
    );
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
    const spinner = this.state.isMapLoaded ? "" : <Spinner />;
    // NOTE Inline style is necessary here!
    return (
      <div className={styles.container}>
        <div
          ref="mapContainer"
          style={{
            position: "absolute",
            height: "100%",
            width: "100%"
          }}
        />
        {spinner}
      </div>
    );
  }
}

BaseMapClass.propTypes = {
  loadGoogleMaps: PropTypes.func.isRequired,
  googleMaps: PropTypes.object
};

export const extendConnectedComponent = MapClass =>
  connect(
    state => ({
      googleMaps: state.googleMaps && state.googleMaps.lib && state.googleMaps.lib.maps
    }),
    dispatch => ({
      loadGoogleMaps: () => dispatch(fetchGoogleMapsLib())
    })
  )(MapClass);
