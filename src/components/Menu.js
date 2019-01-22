import React, { Component } from 'react';
import './Menu.css';
import MenuItem from './MenuItem';
import Hamburger from './svgs/Hamburger';


export default class Menu extends Component {
  constructor (props){
    super(props)
    this.state= {
      open: false
    }
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    if(this.state.open === false) {
      this.setState({
        open: true
      })
    } else {
      this.setState({
        open: false
      })
    }

  }

  render() {
    return (
      <div className='menu'>
        <div className='hamburger' onClick={ this.toggleMenu }>
          <Hamburger />
        </div>
        <div className={`menu--dropdown ${this.state.open ? 'open' : 'closed' }`} >
          <MenuItem name='Home' handleClick={this.props.handleClick} />
          <MenuItem name='Pombos' handleClick={this.props.handleClick} />
          <MenuItem name='Resultados' handleClick={this.props.handleClick} />
          <MenuItem name='Leilões' handleClick={this.props.handleClick}/>
          <MenuItem name='Blog' handleClick={this.props.handleClick}/>
        </div>
      </div>
    )
  }
}
