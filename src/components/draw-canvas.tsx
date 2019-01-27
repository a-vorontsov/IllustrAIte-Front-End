import * as React from "react";
import DrawableCanvas from "../draw-canvas-lib";

export default class DrawCanvas extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      lineCoords: []
    }
    this.lineCoords = this.lineCoords.bind(this);
  }

  lineCoords(coords) {
    const {lineCoords} = this.state;
    lineCoords.push(coords);
    this.setState({lineCoords});
  }

  render() {
    return (
      <div className="draw-area">
        <DrawableCanvas lineWidth={4} canvasStyle={{height: "100vh", width: "100vw"}} lineCoords={this.lineCoords}/>
      </div>
    );
  }
}
