import * as React from "react";
const request = require("superagent");

export default class WaitingRoom extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  roomLooper;

  async componentDidMount() {
    const req = request
        .post("http://localhost:5555/game/info")
        .set("Content-Type: application/json")
        .set("Accept: application/json")
    const res = await req.send({host: localStorage.getItem("host")});
    this.roomLooper = setInterval(async () => {
      const req = request
      .post("http://localhost:5555/game/info")
      .set("Content-Type: application/json")
      .set("Accept: application/json")
      const res = await req.send({host: localStorage.getItem("host")});
      if (Object.keys(res.body.initialImages).length === Object.keys(res.body.players).length) {
        clearInterval(this.roomLooper);
        this.props.onAction("overlay");
      }
    }, 1000);
    if (Object.keys(res.body.initialImages).length === Object.keys(res.body.players).length) {
      clearInterval(this.roomLooper);
      this.props.onAction("overlay");
    }
  }

  componentWillUnmount() {
    clearInterval(this.roomLooper);
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content fade-in">
            <div className="modal-body text-center">
              <h1 className="modal-title">Waiting...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
