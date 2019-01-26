import * as React from "react";
import DrawCanvas from "./components/draw-canvas";
import Login from "./components/login";
import HostJoin from "./components/host-join";
import {
  JoinRoom,
  HostRoom
} from "./components/host-join";
import LoginRegister from "./components/login-register";
import Register from "./components/register";

export default class MainMenu extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      stage: "main"
    }
    this.login = this.login.bind(this);
    this.onAction = this.onAction.bind(this);
  }

  login(event) {
    if (event) {
      this.setState({
        stage: "hostJoin"
      });
    }
  }

  onAction(action: string) {
    switch (action) {
      case "login":
      case "register":
      case "join":
      case "host":
      case "hostJoin":
      case "main":
      case "draw":
        this.setState({stage: action});
        break;
    }
  }

  render() {
    const {stage} = this.state;
    return (
      <div>
        {
          (() => {
            switch(stage) {
              case "main":
                return <LoginRegister onAction={this.onAction}/>;
              case "login":
                return <Login login={this.login} onAction={this.onAction}/>;
              case "register":
                return <Register login={this.login} onAction={this.onAction}/>;
              case "hostJoin":
                return <HostJoin onAction={this.onAction}/>;
              case "host":
                return <HostRoom onAction={this.onAction}/>;
              case "join":
                return <JoinRoom onAction={this.onAction}/>;
              case "draw":
                return <DrawCanvas/>;
              default:
                return <LoginRegister onAction={this.onAction}/>;
            }
          })()
        }
      </div>
    );
  }
}
