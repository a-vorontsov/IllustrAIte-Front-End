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
import ViewRoom from "./components/view-room";
import WaitingRoom from "./components/waiting-room";
import WaitingRoom2 from "./components/waiting-room2";
import OverlayCanvas from "./components/overlay-canvas";
import GuessScreen from "./components/guess-screen";
import GuessScreen2 from "./components/guess-screen2";

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
      case "viewRoom":
      case "waitingRoom":
      case "waitingRoom2":
      case "overlay":
      case "guessScreen1":
      case "guessScreen2":
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
              case "viewRoom":
                return <ViewRoom onAction={this.onAction}/>;
              case "draw":
                return <DrawCanvas onAction={this.onAction}/>;
              case "overlay":
                return <OverlayCanvas onAction={this.onAction}/>;
              case "waitingRoom":
                return <WaitingRoom onAction={this.onAction}/>;
              case "waitingRoom2":
                return <WaitingRoom2 onAction={this.onAction}/>;
              case "guessScreen1":
                return <GuessScreen onAction={this.onAction}/>;
              case "guessScreen2":
                return <GuessScreen2 onAction={this.onAction}/>;
              default:
                return <LoginRegister onAction={this.onAction}/>;
            }
          })()
        }
      </div>
    );
  }
}
