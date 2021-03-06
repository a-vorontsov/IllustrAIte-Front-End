import * as React from "react";
import DrawableCanvas from "../draw-canvas-lib";
const request = require("superagent");

export default class DrawCanvas extends React.Component<any, any> {
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
    setTimeout(async () => {
      const req = request
        .post("http://localhost:5555/game/initial_images")
        .set("Content-Type: application/json")
        .set("Accept: application/json")
      const res = await req.send({
        host: localStorage.getItem("host"),
        username: localStorage.getItem("username"),
        image: this.state.lineCoords
      });
      this.props.onAction("waitingRoom");
    }, 10000);
  }

  async updateLines() {
    const req = request
      .post("http://localhost:5555/game/info")
      .set("Content-Type: application/json")
      .set("Accept: application/json")
    const res = await req.send({host: localStorage.getItem("host")});
    console.log(res.body);
  }

  render() {
    return (
      <div>
        <h1 style={{color: "white"}}>{localStorage.getItem("drawObject")}</h1>
        <div className="draw-area">
          <DrawableCanvas lineWidth={4} canvasStyle={{backgroundColor: "#fff"}} lineCoords={this.lineCoords} newLines={this.state.newLines}/>
        </div>
      </div>
    );
  }
}
