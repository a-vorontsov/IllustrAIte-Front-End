import * as React from "react";
import MainMenu from "./views";

export default class App extends React.Component {
    render() {
        return (
            <div className="main-container">
              <MainMenu/>
            </div>
        );
    }
}
