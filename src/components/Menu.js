import React, { Component } from 'react';
import './Menu.css';
import MenuItem from './MenuItem';

export default class Menu extends Component {
  render() {
    return (
      <div className='menu'>
        
       <div></div>
        <MenuItem name='Home' />
        <MenuItem name='Pombos' />
        <MenuItem name='Resultados' />
        <MenuItem name='Leilões' />
        <MenuItem name='Blog' />
     

       
      </div>
    )
  }
}
