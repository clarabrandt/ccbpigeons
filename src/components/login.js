import React, { Component } from 'react';
import './Login.css'

export default class Login extends Component {

  
  render() {
    return (
      <form className='login--form'>
        <label>
          Name:
          <input type="text" name="name"/>
        </label>
        <label>
          Password:
          <input type="text" name="password"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
