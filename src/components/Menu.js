import React, { Component } from 'react';
import './Menu.css';
import Pigeons from './Pigeons.js';
import Results from './Results.js';
import Blog from './Blog.js';
import Leiloes from './Leiloes.js';

export default class Menu extends Component {
  render() {
    return (
      <div className='menu'>
        <div></div>
        <div></div>
        <Pigeons /> 
        <Results />
        <Leiloes />
        <Blog />
        <div></div>
        <div></div>
       
      </div>
    )
  }
}
