import React from "react";
import SVGMap from "./SVGMap";
import Dust from "./Dust";
import styles from "./Home.scss";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      hoveredCountryCode: null,
      isHovering: false
    };
  }

  onCountryHover(countryCode) {
    this.setState({
      allowAnimation: true,
      hoveredCountryCode: countryCode || this.state.hoveredCountryCode,
      isHovering: !!countryCode
    });
  }

  getClassNameForCountryText(countryCode = "") {
    return `${styles.countryName} ${
      this.state.isHovering && this.state.hoveredCountryCode === countryCode ? styles.hover : ""
    } ${this.state.allowAnimation ? "" : styles.animationDisabled}`;
  }

  getClassNameForExamplePhoto(countryCode = "") {
    return `${styles.examplePhoto} ${
      this.state.isHovering && this.state.hoveredCountryCode === countryCode ? styles.visible : ""
    } ${styles[countryCode.toLowerCase()]}`;
  }

  render() {
    return (
      <div className={styles.container}>
        {/* Example photos */}
        <div className={this.getClassNameForExamplePhoto("LT")} />
        <div className={this.getClassNameForExamplePhoto("BY")} />
        <div className={this.getClassNameForExamplePhoto("UA")} />
        <div className={this.getClassNameForExamplePhoto("RO")} />
        <div className={this.getClassNameForExamplePhoto("BG")} />
        <div className={this.getClassNameForExamplePhoto("TR")} />
        <div className={this.getClassNameForExamplePhoto("GE")} />
        <div className={this.getClassNameForExamplePhoto("AZ")} />
        <div className={this.getClassNameForExamplePhoto("IR")} />
        <div className={this.getClassNameForExamplePhoto("AE")} />
        {/* Mask */}
        <div className={`${styles.examplePhotoMask}`} />
        {/* Dust effect */}
        <Dust />
        {/* Map */}
        <div className={styles.mapContainer}>
          <SVGMap
            onCountryHover={countryCode => this.onCountryHover(countryCode)}
            history={this.props.history}
          />
        </div>
        {/* See photos from... text */}
        <div
          className={`${styles.showPhotosForCountry} ${this.state.isHovering ? styles.hover : ""}`}
        >
          <div>See photos from</div>
          <div className={this.getClassNameForCountryText("LT")}>Lithuania</div>
          <div className={this.getClassNameForCountryText("BY")}>Belarus</div>
          <div className={this.getClassNameForCountryText("UA")}>Ukraine</div>
          <div className={this.getClassNameForCountryText("RO")}>Romania</div>
          <div className={this.getClassNameForCountryText("BG")}>Bulgaria</div>
          <div className={this.getClassNameForCountryText("TR")}>Turkey</div>
          <div className={this.getClassNameForCountryText("GE")}>Georgia</div>
          <div className={this.getClassNameForCountryText("AZ")}>Azerbaijan</div>
          <div className={this.getClassNameForCountryText("IR")}>Iran</div>
          <div className={this.getClassNameForCountryText("AE")}>United Arab Emirates</div>
        </div>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <a href="#/photos">See all photos</a>
            </li>
            <li>
              <a href="#/map">See full trip map</a>
            </li>
            <li>
              <a href="#/about">About</a>
            </li>
          </ul>
          <section className={styles.contact}>
            <a href="https://www.facebook.com/jonas.biciunas" className={styles.facebook}>
              <span className={styles.greyIcon} />
              <span className={styles.colorIcon} />
            </a>
            <a href="https://www.instagram.com/bomzpakis.travel" className={styles.instagram}>
              <span className={styles.greyIcon} />
              <span className={styles.colorIcon} />
            </a>
            <a href="mailto:jonas.biciunas@yahoo.com" className={styles.mail}>
              <span className={styles.greyIcon} />
              <span className={styles.colorIcon} />
            </a>
          </section>
        </nav>
      </div>
    );
  }
}
