import React from "react";
import { Route, Link, NavLink } from "react-router-dom";
import SVGMap from "./SVGMap";
import Dust from "./Dust";
import About from "./About";
import styles from "./Home.scss";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      hoveredCountryCode: null,
      isHovering: false,
      isAboutShowing: false
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
        <Route path="#about" children={() => <About isShowing={this.state.isAboutShowing} />} />

        <nav
          className={`${styles.navigation} ${
            this.state.isAboutShowing ? styles.linkIsSelected : ""
          }`}
        >
          <ul>
            <li>
              <Link to="/photos">See all photos</Link>
            </li>
            <li>
              <Link to="/map">See full trip map</Link>
            </li>
            <li>
              <NavLink
                to={{ hash: "about" }}
                exact
                onClick={() =>
                  this.setState({
                    isAboutShowing: !this.state.isAboutShowing
                  })
                }
                className={this.state.isAboutShowing ? styles.selectedLink : ""}
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
        <section
          className={`${styles.contact} ${this.state.isAboutShowing ? styles.linkIsSelected : ""}`}
        >
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
      </div>
    );
  }
}
