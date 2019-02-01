import React, { Component } from 'react';
import './Login.css'

export default class Login extends Component {
  render() {
    return (

      <div className='content--grid'>
        <div className='content--left'>
        </div>
        <div className='content--main'>
          <form className= {`login--form ${this.state.open ? 'open' : 'closed' }`}>
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
        </div>
        <div className='content--right'>
        </div>
      </div>     
    )
  }
}
