import * as React from "react";

export default class LoginRegister extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(type: string) {
    switch (type) {
      case "login":
      case "register":
        this.props.onAction(type);
        break;
    }
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content fade-in">
            <div className="modal-header">
              <h1 className="modal-title">TBC Game Name</h1>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <button onClick={() => this.onClick("login")}
                          type="button"
                          className="btn btn-lg btn-block btn-primary btn-room">
                    Log In
                  </button>
                </div>
                <div className="col-6">
                  <button onClick={() => this.onClick("register")}
                          type="button"
                          className="btn btn-lg btn-block btn-success btn-room">
                    Sign Up
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
