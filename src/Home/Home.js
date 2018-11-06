import React from "react";
import SVGMap from "./SVGMap";
import styles from "./Home.css";

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
      hoveredCountryCode: countryCode || this.state.hoveredCountryCode,
      isHovering: !!countryCode
    });
  }

  getClassNameForCountryText(countryCode = "") {
    return `${styles.showPhotosForCountry} ${
      this.state.isHovering && this.state.hoveredCountryCode === countryCode ? styles.hover : ""
    } ${styles[countryCode.toLowerCase()]}`;
	}
	
	getClassNameForExamplePhoto(countryCode = "") {
		return `${styles.examplePhoto} ${
      this.state.isHovering && this.state.hoveredCountryCode === countryCode ? styles.visible : ""
    } ${styles[countryCode.toLowerCase()]}`;
	}

	selectCountry(countryCode) {
		
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
				{/* Map */}
        <div className={styles.mapContainer}>
          <SVGMap onCountryHover={countryCode => this.onCountryHover(countryCode)} onCountryClick={countryCode => this.selectCountry(countryCode)} />
        </div>
				{/* See photos from... text */}
        <div className={this.getClassNameForCountryText("LT")}>
          <div>See photos from</div>
          <div>Lithuania</div>
        </div>
        <div className={this.getClassNameForCountryText("BY")}>
          <div>See photos from</div>
          <div>Belarus</div>
        </div>
        <div className={this.getClassNameForCountryText("UA")}>
          <div>See photos from</div>
          <div>Ukraine</div>
        </div>
        <div className={this.getClassNameForCountryText("RO")}>
          <div>See photos from</div>
          <div>Romania</div>
        </div>
        <div className={this.getClassNameForCountryText("BG")}>
          <div>See photos from</div>
          <div>Bulgaria</div>
        </div>
        <div className={this.getClassNameForCountryText("TR")}>
          <div>See photos from</div>
          <div>Turkey</div>
        </div>
        <div className={this.getClassNameForCountryText("GE")}>
          <div>See photos from</div>
          <div>Georgia</div>
        </div>
        <div className={this.getClassNameForCountryText("AZ")}>
          <div>See photos from</div>
          <div>Azerbaijan</div>
        </div>
        <div className={this.getClassNameForCountryText("IR")}>
          <div>See photos from</div>
          <div>Iran</div>
        </div>
        <div className={this.getClassNameForCountryText("AE")}>
          <div>See photos from</div>
          <div>United Arab Emirates</div>
        </div>
      </div>
    );
  }
}
