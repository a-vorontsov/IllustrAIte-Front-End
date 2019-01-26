import * as React from "react";
import * as ReactDOM from "react-dom";
import "../dist/styles/stylesheet.css";

import App from "./app";

(function () {
  switch (process.env.NODE_ENV) {
    case "prod":
    case "production":
    case "staging":
      break;
    default:
      let devServer = document.createElement("script");
      devServer.src = "/webpack-dev-server.js";
      document.head.appendChild(devServer);
      break;
  }
  ReactDOM.render(<App/>, document.getElementById("main"));
})();
