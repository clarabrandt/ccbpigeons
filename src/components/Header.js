import React, { Component } from 'react';
import './Header.css';
import Title from './Title.js';
import Logo from './Logo.js'

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <Logo />
        <Title />
      </div>
    )
  }
}

export default Header 
