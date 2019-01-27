import * as React from "react";
const request = require("superagent");

export default class HostJoin extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onAction = this.onAction.bind(this);
  }

  async onAction(action: string) {
    switch (action) {
      case "logout":
        localStorage.clear();
        this.props.onAction("main");
        break;
      case "host":
        const req = request
          .post("http://localhost:5555/game/create")
          .set("Content-Type: application/json")
          .set("Accept: application/json")
        const res = await req.send({username: localStorage.getItem("username")});
        localStorage.setItem("host", localStorage.getItem("username"));
      case "join":
        this.props.onAction(action);
        break;
    }
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content fade-in">
            <div className="modal-header">
              <h1 className="modal-title">Host or Join</h1>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <button onClick={() => this.onAction("join")}
                          type="button"
                          className="btn btn-lg btn-block btn-primary btn-room">
                    Join Room
                  </button>
                </div>
                <div className="col-6">
                  <button onClick={() => this.onAction("host")}
                          type="button"
                          className="btn btn-lg btn-block btn-success btn-room">
                    Host Room
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => {this.onAction("logout")}}
                      type="button"
                      className="btn btn-block btn-light">
                <span>log out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class JoinRoom extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      roomName: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onAction = this.onAction.bind(this);
  }

  async onChange(event) {
    const value = event.currentTarget.value;
    const field = event.currentTarget.id;
    const newState = this.state as any;
    newState[field] = value;
    await this.setState(newState);
  }

  async onAction(action: string) {
    switch (action) {
      case "join":
        const payload = {
          host: this.state.roomName,
          username: localStorage.getItem("username"),
        };
        const req = request
          .post("http://localhost:5555/game/join")
          .set("Content-Type: application/json")
          .set("Accept: application/json")
        const res = await req.send(payload)
        localStorage.setItem("host", this.state.roomName);
        this.props.onAction("viewRoom");
        break;
      case "back":
        this.props.onAction("hostJoin");
        break;
    }
  }

  render() {
    const {roomName} = this.state;
    return (
      <div className="modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content fade-in">
            <div className="modal-header">
              <h1 className="modal-title">Join Room</h1>
              <button onClick={() => {this.onAction("back")}}
                      type="button"
                      className="close">
                <span>back</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <input id="roomName"
                       type="text"
                       placeholder="Room Name"
                       value={roomName}
                       className="form-control form-control-lg login-form"
                       onChange={this.onChange}/>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => this.onAction("join")}
                      type="button"
                      className="btn btn-lg btn-block btn-primary">
                Join Room
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class HostRoom extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
    this.onAction = this.onAction.bind(this);
  }

  async onAction(action: string) {
    switch (action) {
      case "start":
        const req = request
          .post("http://localhost:5555/game/start")
          .set("Content-Type: application/json")
          .set("Accept: application/json")
        const res = await req.send({host: localStorage.getItem("username")});
        this.props.onAction("draw");
        break;
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
    const res = await req.send({host: localStorage.getItem("username")});
    await this.setState({players: res.body.players});
    const drawObject = Object.entries(res.body.players).filter(p => p[0] === localStorage.getItem("username"))[0][1] as string;
    localStorage.setItem("drawObject", drawObject);
    this.roomLooper = setInterval(async () => {
      const req = request
        .post("http://localhost:5555/game/info")
        .set("Content-Type: application/json")
        .set("Accept: application/json")
      const res = await req.send({host: localStorage.getItem("username")});
      await this.setState({players: res.body.players});
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
                <h1>{localStorage.getItem("username")}</h1>
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
            <div className="modal-footer">
              <button onClick={() => this.onAction("start")}
                      type="button"
                      className="btn btn-lg btn-block btn-primary">
                Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
