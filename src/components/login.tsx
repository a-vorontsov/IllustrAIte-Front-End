import * as React from "react";
const request = require("superagent");

export default class Login extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onAction = this.onAction.bind(this);
  }

  async onChange(event) {
    const value = event.currentTarget.value;
    const field = event.currentTarget.id;
    const newState = this.state as State;
    newState[field] = value;
    await this.setState(newState);
  }

  async onAction(action: string) {
    switch (action) {
      case "back":
        this.props.onAction("main");
        break;
      case "login":
        const req = request
          .post("http://localhost:5555/user/login")
          .set("Content-type: application/json")
          .set("Accept: application/json")
        const res = await req.send(this.state);
        localStorage.setItem("username", this.state.username);
        localStorage.setItem("location", "GB");
        this.props.onAction("hostJoin");
        break;
    }
  }

  render() {
    const {username, password} = this.state;
    return (
      <div className="modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content fade-in">
            <div className="modal-header">
              <h1 className="modal-title">Log In</h1>
              <button onClick={() => {this.onAction("back")}}
                      type="button"
                      className="close">
                <span>back</span>
              </button>
            </div>
            <div className="modal-body">
              <input id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    className="form-control form-control-lg login-form"
                    onChange={this.onChange}/>
              <input id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="form-control form-control-lg login-form"
                    onChange={this.onChange}/>
            </div>
            <div className="modal-footer">
              <button onClick={() => this.onAction("login")}
                      type="button"
                      disabled={!(username.length >= 2 && password.length >= 8)}
                      className="btn btn-lg btn-block btn-primary">
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

type State = {
  username: string;
  password: string;
}
