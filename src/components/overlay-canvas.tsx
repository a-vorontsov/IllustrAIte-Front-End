import * as React from "react";
import DrawableCanvas from "../draw-canvas-lib";
const request = require("superagent");

export default class OverlayCanvas extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      lineCoords: [],
      newLines: [],
    }
    this.lineCoords = this.lineCoords.bind(this);
  }

  lineCoords(coords) {
    const {lineCoords} = this.state;
    lineCoords.push(coords);
    this.setState({lineCoords});
  }

  async componentDidMount() {
    const req = request
      .post("http://localhost:5555/game/info")
      .set("Content-Type: application/json")
      .set("Accept: application/json")
    const res = await req.send({host: localStorage.getItem("host")});
    localStorage.setItem("opponent", Object.keys(res.body.players).filter(p => p !== localStorage.getItem("username"))[0])
    const newLines = res.body.initialImages[localStorage.getItem("opponent")];
    this.setState({newLines});
    setTimeout(async () => {
      const req = request
        .post("http://localhost:5555/game/overlay_images")
        .set("Content-Type: application/json")
        .set("Accept: application/json")
      const res = await req.send({
        host: localStorage.getItem("host"),
        username: localStorage.getItem("username"),
        images: {
          [localStorage.getItem("opponent")]: this.state.lineCoords
        }
      });
      this.props.onAction("waitingRoom2");
    }, 10000);
  }

  async updateLines() {
    const req = request
      .post("http://localhost:5555/game/info")
      .set("Content-Type: application/json")
      .set("Accept: application/json")
    const res = await req.send({host: localStorage.getItem("host")});
  }

  render() {
    return (
      <div>
        <div className="draw-area">
          <DrawableCanvas lineWidth={4} canvasStyle={{backgroundColor: "#fff"}} lineCoords={this.lineCoords} newLines={this.state.newLines}/>
        </div>
      </div>
    );
  }
}
