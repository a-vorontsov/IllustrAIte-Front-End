import * as React from "react";
const request = require("superagent");

export default class ViewRoom extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onAction = this.onAction.bind(this);
    this.state = {
      players: []
    };
  }

  async onAction(action: string) {
    switch (action) {
      case "back":
        this.props.onAction("hostJoin");
        break;
    }
  }

  roomLooper;

  async componentWillMount() {
    const req = request
      .post("http://localhost:5555/game/info")
      .set("Content-Type: application/json")
      .set("Accept: application/json")
    const res = await req.send({host: localStorage.getItem("host")});
    this.setState({players: res.body.players});
    const drawObject = Object.entries(res.body.players).filter(p => p[0] === localStorage.getItem("username"))[0][1] as string;
    localStorage.setItem("drawObject", drawObject);
    if (res.body.started) {
      this.props.onAction("draw");
    }
    this.roomLooper = setInterval(async () => {
      const req = request
        .post("http://localhost:5555/game/info")
        .set("Content-Type: application/json")
        .set("Accept: application/json")
      const res = await req.send({host: localStorage.getItem("host")});
      this.setState({players: res.body.players});
      if (res.body.started) {
        this.props.onAction("draw");
      }
    }, 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.roomLooper);
  }

  render() {
    const {players} = this.state;
    return (
      <div className="modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content fade-in">
            <div className="modal-header">
              <div className="modal-title text-center">
                <h3>Room Name:</h3>
                <h1>{localStorage.getItem("host")}</h1>
              </div>
              <button onClick={() => {this.onAction("back")}}
                      type="button"
                      className="close">
                <span>back</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="text-center">
                <h3>Players:</h3>
                <hr/>
                {
                  Object.keys(players).map(player => <h2>{player}</h2>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
