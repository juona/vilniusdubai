import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.css";

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isPhotosHovering: false, isAboutHovering: false };
		this.toggleLeftShadow = this.toggleLeftShadow.bind(this);
		this.toggleRightShadow = this.toggleRightShadow.bind(this);
	}

	toggleLeftShadow() {
		this.setState({
			isPhotosHovering: !this.state.isPhotosHovering
		});
	}

	toggleRightShadow() {
		this.setState({
			isAboutHovering: !this.state.isAboutHovering
		});
	}

	render() {
		return (
			<div className={styles.container}>
				<div
					className={
						this.state.isPhotosHovering
							? styles.hackShadowContainerLeft
							: styles.hackShadowContainer
					}
				>
					<div className={styles.hackShadow} />
				</div>
				<div
					className={
						this.state.isAboutHovering
							? styles.hackShadowContainerRight
							: styles.hackShadowContainer
					}
				>
					<div className={styles.hackShadow} />
				</div>
				<div className={styles.menuContainer}>
						<nav className={styles.menu}>
							<Link
								to="/photos"
								className={styles.linkPhotos}
								onMouseEnter={this.toggleLeftShadow}
								onMouseLeave={this.toggleLeftShadow}
							>
								<span className={styles.textNode}>Gallery</span>
								<div className={styles.linkBackground}></div>
							</Link>
							<Link to="/map" className={styles.linkMap}>
								<span className={styles.textNode}>Map</span>
								<div className={styles.linkBackground}></div>
							</Link>
							<Link
								to="/stories"
								className={styles.linkAbout}
								onMouseEnter={this.toggleRightShadow}
								onMouseLeave={this.toggleRightShadow}
							>
								<span className={styles.textNode}>Stories</span>
								<div className={styles.linkBackground}></div>
							</Link>
						</nav>
				</div>
				<div className={styles.menuShadowContainer}>
					<div className={styles.menuShadow}></div>
				</div>
			</div>
		);
	}
}
