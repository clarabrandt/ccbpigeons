import React, { Component } from 'react';
import './Menu.css';
import MenuItem from './MenuItem';
import Hamburger from './svgs/Hamburger';
import Cross from './svgs/Cross';


export default class Menu extends Component {
  constructor(props) {
    super(props)
    this.menu = React.createRef();
    this.state = {
      open: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this);

  }

  toggleMenu() {
    if (this.state.open === false) {
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

      <div className={`menu ${this.props.sticky ? 'sticky' : 'notSticky'}`} sticky={this.props.sticky}>
        <div className={`menu--dropdown ${this.state.open ? 'open' : 'closed'}`} onClick={this.toggleMenu} >
          <MenuItem name='Home' anchor='home' handleClick={this.props.handleClick} />
          <MenuItem name='Sobre' anchor='sobre' handleClick={this.props.handleClick} />
          <MenuItem name='Blog' anchor='blog' handleClick={this.props.handleClick} />
          <MenuItem name='Resultados' anchor='resultados' handleClick={this.props.handleClick} />
          <MenuItem name='Mídia' anchor='midia' handleClick={this.props.handleClick} />
          <MenuItem name='Leilões' anchor='leiloes' handleClick={this.props.handleClick} />
        </div>
        <div className={`hamburger ${this.state.open ? 'open' : 'closed'}`} onClick={this.toggleMenu}>
          <Hamburger />
        </div>
        <div className={`cross ${this.state.open ? 'open' : 'closed'}`} onClick={this.toggleMenu}>
          <Cross />
        </div>
      </div>
    )
  }
}
