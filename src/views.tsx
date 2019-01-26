import * as React from "react";
import DrawCanvas from "./components/draw-canvas";

export default class MainMenu extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>hello</h1>
        <DrawCanvas/>
      </div>
    );
  }
}
