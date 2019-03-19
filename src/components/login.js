import React, { Component } from 'react';
import firebase from 'firebase';
import './Login.css'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.authWithEmailAndPassword = this.authWithEmailAndPassword.bind(this)
    
  }
  authWithEmailAndPassword(event) {
    event.preventDefault();
    console.log('auth with email');

  }
  componentDidMount() {
    console.log(this.props.login)
  }

  render() {
    return (
      <div className='login' anchor='login' ref={this.props.login}>
      
        <form className= 'login--form'>
          <label>
            Email:
            <input type="email" name="email" ref={(input) => { this.emailInput = input }}/>
          </label>
          <label>
            Password:
            <input type="text" name="password" ref={(input) => { this.passwordInput = input }}/>
          </label>
          <input type="submit" value="Log in" onClick={this.authWithEmailAndPassword} />
        </form>
      </div>     
    )
  }
}
