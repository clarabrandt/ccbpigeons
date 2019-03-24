import React, { Component } from 'react';
import './Login.css';
import { FirebaseContext } from './firebase'

export default class Login extends Component {

  baseUrl = 'https://us-central1-pigeon-90548.cloudfunctions.net/api/';

  constructor(props) {
    super(props);

    this.state={
      email:'',
      password:''
    }  
  }

  authWithEmailAndPassword = (event) => {
    event.preventDefault();
    console.log('auth with email');
  }

  handleClick = (event) => {
    const endpoint = `${this.baseUrl}login`;
    event.preventDefault();
    const data = { email: this.state.email, password: this.state.password };
    
    console.log(this.state.email, this.state.password)
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <FirebaseContext.Consumer>
        {firebase => {
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
        }}
      </FirebaseContext.Consumer>
    )
  }
}
