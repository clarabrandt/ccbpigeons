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
      <div className='login' anchor='login' ref={this.props.login}>
        <form className= 'login--form'>
          <label>
            Email:
            <input type="email" name="email" ref={(input) => { this.emailInput = input }} onChange={ this.handleChange }/>
          </label>
          <label>
            Password:
            <input type="text" name="password" ref={(input) => { this.passwordInput = input }} onChange={ this.handleChange }/>
          </label>
          <button type="submit" value="Log in" onSubmit={this.authWithEmailAndPassword} onClick={ this.handleClick }>Log in </button>
        </form>
      </div> 
    ) 
  }
}

const LoginPage = compose(
  withRouter,
  withFirebase,
)(Login);

export default Login;

export { LoginPage };
