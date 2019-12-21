import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../utils/config";
class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const url = "http://localhost:5000/users/login";
    if (email.length && password.length) {
      axios
        .post(url, { email, password })
        .then(r => {
          localStorage.setItem("API_TOKEN", r.data.token);
          this.props.history.push("/");
        })
        .catch(e => {
          console.log(e.response);
        });
    }
  };

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
            <form onSubmit={this.onSubmit}>
              <input
                onChange={this.handleChange}
                type="text"
                id="Login"
                className="fadeIn second"
                name="email"
                placeholder="Login"
              />
              <input
                onChange={this.handleChange}
                type="text"
                id="password"
                className="fadeIn third"
                name="password"
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
