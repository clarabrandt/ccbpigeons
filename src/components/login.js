import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import "./Login.css";
import { withFirebase } from "./firebase";

class Login extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: null
    };
  }

  handleClick = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="login">
        <figure className="avatar">
          <img src="https://placehold.it/128x128" alt="" />
        </figure>
        <form>
          <div className="login-field">
            <div className="login-control">
              <input
                className="login-input"
                type="email"
                name="email"
                placeholder="Your Email"
                autoFocus=""
                ref={input => {
                  this.emailInput = input;
                }}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="login-field">
            <div className="login-control">
              <input
                className="login-input"
                name="password"
                type="password"
                placeholder="Your Password"
                ref={input => {
                  this.passwordInput = input;
                }}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="error-message">{error && error.message}</div>
          <div className="login-checkbox">
            <label className="login-checkbox">
              {" "}
              <input type="checkbox" />
              Remember me{" "}
            </label>
          </div>
          <button
            className="button-submit"
            type="submit"
            value="Log in"
            onClick={this.handleClick}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

const LoginPage = compose(
  withRouter,
  withFirebase
)(Login);

export default Login;

export { LoginPage };
