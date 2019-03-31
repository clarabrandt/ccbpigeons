import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import './Login.css';
import { withFirebase } from './firebase';

class Login extends Component {

  baseUrl = 'https://us-central1-pigeon-90548.cloudfunctions.net/api/';

  constructor(props) {
    super(props);

    this.state={
      email:'',
      password:'',
      error: null,
    }  
  }

  authWithEmailAndPassword = (event) => {
    event.preventDefault();
    console.log('auth with email');
  }

  handleClick = (event) => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <section className="hero is-white is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <div className="box">
                <figure className="avatar">
                  <img src="https://placehold.it/128x128" alt="" />
                </figure>
                <form>
                  <div className="field">
                    <div className="control">
                      <input className="input is-large" 
                        type="email" 
                        placeholder="Your Email" 
                        autoFocus="" 
                        ref={(input) => { this.emailInput = input }} 
                        onChange={this.handleChange} 
                      />
                    </div>
                    </div>
                    <div className="field">
                      <div className="control">
                      <input className="input is-large" 
                        type="password" 
                        placeholder="Your Password" 
                        ref={(input) => { this.passwordInput = input }} 
                        onChange={this.handleChange} 
                      />
                      </div>
                    </div>
                    <div className="field">
                      <label className="checkbox"> <input type="checkbox" />Remember me </label>
                    </div>
                  <button className="button is-block is-info is-large is-fullwidth" 
                    type="submit" value="Log in" 
                    onSubmit={this.authWithEmailAndPassword} 
                    onClick={this.handleClick}>Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const LoginPage = compose(
  withRouter,
  withFirebase,
)(Login);

export default Login;

export { LoginPage };
