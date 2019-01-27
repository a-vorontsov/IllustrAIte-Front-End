import * as React from "react";
const request = require("superagent");

export default class ViewRoom extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    const host = localStorage.getItem("host");
    // TODO
    // const req = request
    //   .get("/game/info")
    //   .set("Content-Type: application/json")
    //   .set("Accept: application/json")
    // const res = await req.send({host});
  }

  render() {
    return <div></div>;
  }
}
