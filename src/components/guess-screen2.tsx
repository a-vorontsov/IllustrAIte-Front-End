import * as React from "react";
import DisplayCanvas from "./display-canvas";
const request = require("superagent");

export default class GuessScreen2 extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      player: "asdf1"
    };
    this.onClick = this.onClick.bind(this);
  }

  async componentWillMount() {
    const req = request
        .post("http://localhost:5555/game/info")
        .set("Content-Type: application/json")
        .set("Accept: application/json")
    const res = await req.send({host: localStorage.getItem("host")});
    const overlays = res.body.overlayImages;
    const initials = res.body.initialImages;
    const aiImages = overlays.AI;
    delete overlays.AI;
    let player1Images, player2Images;
    if (localStorage.getItem("username") === "asdf") {
      player1Images = {ai: aiImages.asdf, player: initials.asdf.concat(overlays.asdf1.asdf)};
      player2Images = {ai: aiImages.asdf1, player: initials.asdf1.concat(overlays.asdf.asdf1)};
    } else {
      player1Images = {ai: aiImages.asdf1, player: initials.asdf.concat(overlays.asdf.asdf1)};
      player2Images = {ai: aiImages.asdf, player: initials.asdf.concat(overlays.asdf1.asdf)};
    }
    this.setState({player1Images, player2Images});
  }

  async componentDidMount() {
    const {player1Images, player2Images} = this.state;
    await this.setState({player1Images, player2Images});
  }

  onClick(event) {
    event.preventDefault();
  }

  render() {
    const {player, player1Images, player2Images} = this.state;
    if (!!player2Images && Object.keys(player2Images).length > 0) {
      return (
        <div className="">
          <div className="">
            <div className="">
            <div className="text-center">
                <h2 className="">Guess The AI Image</h2>
              </div>
              <div className="text-center">
                <div className="guess-area" onClick={() => this.onClick}><DisplayCanvas lineWidth={4} canvasStyle={{backgroundColor: "#fff"}} lineCoords={() => {}} newLines={player2Images.ai}/></div>
                <div className="guess-area" onClick={() => this.onClick}><DisplayCanvas lineWidth={4} canvasStyle={{backgroundColor: "#fff"}} lineCoords={() => {}} newLines={player2Images.player}/></div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
