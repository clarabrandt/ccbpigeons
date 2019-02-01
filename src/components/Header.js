import React, { Component } from 'react';
import './Header.css';
import Title from './Title.js';
// import Logo from './Logo.js'
import Flag from './svgs/Flag'
import Login from './Login';

class Header extends Component {
  
  render() {
    return (
      <div className='header' >
      {/* <div className='logo--logo'>
        <Logo />
      </div> */}
      <div className='title--title'>
        <Title />
      </div>
        <div className='header-items'>
          <Flag />
          <div className='Login' onClick={ () => this.props.handleClick('Login') } > 
          login
          </div>
        </div>
      </div>
    )
  }
}

export default Header 
