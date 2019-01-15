import React, { Component } from 'react';
import './Menu.css';
import MenuItem from './MenuItem';


export default class Menu extends Component {
  render() {
    return (
      <div className='menu'>
        
       <div></div>
       
        <MenuItem name='Home' handleClick={this.props.handleClick} />
        <MenuItem name='Pombos' handleClick={this.props.handleClick} />
        <MenuItem name='Resultados' handleClick={this.props.handleClick} />
        <MenuItem name='Leilões' handleClick={this.props.handleClick}/>
        <MenuItem name='Blog' handleClick={this.props.handleClick}/>
      </div>
    )
  }
}
