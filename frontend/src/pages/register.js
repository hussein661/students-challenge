import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
class Register extends Component {
  state = {
    user: {
      name: "",
      email: "",
      password: ""
    }
  };
  createUser = () => {
    const url = "http://localhost:5000/users/register";
    axios
      .post(url, {
        user: { ...this.state.user }
      })
      .then(r => {
        console.log(r);
      })
      .catch(e => {
        console.log(e.response);
        console.log(e.message);
      });
  };

  handleChange = e => {
    var user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    this.setState({ user });
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
            {/* Register Form */}
            <form>
              <input
                type="text"
                id="name"
                className="fadeIn second"
                name="name"
                onChange={this.handleChange}
                placeholder="name"
              />
              <input
                type="email"
                id="email"
                onChange={this.handleChange}
                className="fadeIn second"
                name="email"
                placeholder="email"
              />
              <input
                type="text"
                onChange={this.handleChange}
                id="password"
                className="fadeIn second"
                name="password"
                placeholder="password"
              />
              <input
                type="text"
                id="cpassword"
                className="fadeIn third"
                name="cpassword"
                placeholder="confirm password"
              />
              <input
                type="button"
                onClick={this.createUser}
                className="fadeIn fourth"
                defaultValue="create my account"
              />
            </form>
            {/* Remind Passowrd */}
            <div id="formFooter">
              <Link to="/login">
                <a className="underlineHover" href="#">
                  already have account
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
