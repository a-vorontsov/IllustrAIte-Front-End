import * as React from "react";
import DrawableCanvas from "react-drawable-canvas"

export default class DrawCanvas extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      lineWidth: 6,
      canvasStyle: {
        height: "100vh",
        width: "100vw"
      }
    }
  }

  render() {
    return (
      <div className="draw-area">
        <DrawableCanvas {...this.state}/>
      </div>
    );
  }
}
