import React from "react";
import styles from "./Dust.css";

export default class Dust extends React.Component {
  constructor({ flakeCount = 400 } = {}) {
    super();
    this.flakeCount = flakeCount;
    this.flakes = [];
    this.canvas = null;
    this.canvas2DContext = null;
  }

  componentDidMount() {
    this.updateCanvasDimensions = this.updateCanvasDimensions.bind(this);
    window.addEventListener("resize", this.updateCanvasDimensions);
    this.canvas = this.refs.canvas;
    this.canvas2DContext = this.canvas.getContext("2d");
    this.createFlakes();
    this.snow();
  }

  componentWillUnmount() {
		window.cancelAnimationFrame(this.animationFrameRequestID);
    window.removeEventListener("resize", this.updateCanvasDimensions);
  }

  updateCanvasDimensions() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createFlakes() {
    while (this.flakes.length < this.flakeCount) {
      this.flakes.push(this.createFlake());
    }
  }

  createFlake(side) {
    const random = Math.random();
    return {
      x:
        side === "left"
          ? 0
          : side === "right"
          ? this.refs.canvas.width
          : Math.floor(Math.random() * this.refs.canvas.width),
      y:
        side === "top"
          ? 0
          : side === "bottom"
          ? this.refs.canvas.height
          : Math.floor(Math.random() * this.refs.canvas.height),
      size: Math.random() > 0.65 ? 0.6 + random * 1.8 : 0.05 + random * 0.55,
      velY: Math.random() * 0.1 - 0.05,
      velX: Math.random() * 0.1 - 0.05,
      opacity: 0.5 - random * 0.45
    };
  }

  snow() {
    this.canvas2DContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.flakes.forEach(this.drawFlake.bind(this));
    this.animationFrameRequestID = window.requestAnimationFrame(this.snow.bind(this));
  }

  resetFlake(flake, side) {
    Object.assign(flake, this.createFlake(side));
  }

  drawFlake(flake) {
    flake.y += flake.velY;
    flake.x += flake.velX;

    if (flake.y >= this.canvas.height) {
      this.resetFlake(flake, "top");
    } else if (flake.y <= 0) {
      this.resetFlake(flake, "bottom");
    } else if (flake.x >= this.canvas.width) {
      this.resetFlake(flake, "left");
    } else if (flake.x <= 0) {
      this.resetFlake(flake, "right");
    }

    this.canvas2DContext.fillStyle = "rgba(200,200,200," + flake.opacity + ")";
    this.canvas2DContext.beginPath();
    this.canvas2DContext.moveTo(
      flake.x + flake.size * Math.cos(0),
      flake.y + flake.size * Math.sin(0)
    );

    for (let side = 0; side < 7; side++) {
      this.canvas2DContext.lineTo(
        flake.x + flake.size * Math.cos((side * 2 * Math.PI) / 6),
        flake.y + flake.size * Math.sin((side * 2 * Math.PI) / 6)
      );
    }
    this.canvas2DContext.fill();
  }

  render() {
    return (
      <canvas
        className={styles.canvas}
        ref="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
      />
    );
  }
}
