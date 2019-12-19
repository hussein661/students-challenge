import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            {/* Tabs Titles */}
            {/* Icon */}
            <div className="fadeIn first">
              <img
                src="http://danielzawadzki.com/codepen/01/icon.svg"
                id="icon"
                alt="User Icon"
              />
            </div>
            {/* Login Form */}
            <form>
              <input
                type="text"
                id="Login"
                className="fadeIn second"
                name="Login"
                placeholder="Login"
              />
              <input
                type="text"
                id="password"
                className="fadeIn third"
                name="Login"
                placeholder="password"
              />
              <input
                type="submit"
                className="fadeIn fourth"
                defaultValue="Log In"
              />
            </form>
            {/* Remind Passowrd */}
            <div id="formFooter">
              <a className="underlineHover" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
