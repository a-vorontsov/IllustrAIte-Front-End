import * as React from "react";
const request = require("superagent");

export default class HostJoin extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onAction = this.onAction.bind(this);
  }

  onAction(action: string) {
    switch (action) {
      case "join":
      case "host":
      case "back":
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

  async onAction() {
    const payload = {
      host: this.state.roomName,
      username: localStorage.getItem("username"),
    };
    // TODO
    // const req = request
    //   .post("/game/join")
    //   .set("Content-Type: application/json")
    //   .set("Accept: application/json")
    // const res = await req.send(payload)
    console.table(payload);
  }

  render() {
    const {roomName} = this.state;
    return (
      <div className="modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content fade-in">
            <div className="modal-header">
              <h1 className="modal-title">Join Room</h1>
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
              <button onClick={this.onAction}
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
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content fade-in">
            <div className="modal-header">
              <h1 className="modal-title">Host Room</h1>
            </div>
            <div className="modal-body">
              <h1>asdf</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
