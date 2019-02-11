import React, { Component } from 'react';
import './Menu.css';
import MenuItem from './MenuItem';
import Hamburger from './svgs/Hamburger';


export default class Menu extends Component {
  constructor (props){
    super(props)
    this.menu = React.createRef();
    this.state= {
      open: false, 
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
      <div className= {`menu ${this.props.sticky ? 'sticky' : 'notSticky' }`} >
        <div className='hamburger' onClick={ this.toggleMenu }>
          <Hamburger />
        </div>
        <div className={`menu--dropdown ${this.state.open ? 'open' : 'closed' }`} >
          <MenuItem name='Home' anchor='home' handleClick={this.props.handleClick} />
          <MenuItem name='Sobre' anchor='about' handleClick={this.props.handleClick} />
          <MenuItem name='Resultados' anchor='results' handleClick={this.props.handleClick} />
          <MenuItem name='Leilões' anchor='leiloes' handleClick={this.props.handleClick}/>
          <MenuItem name='Blog' anchor='blog' handleClick={this.props.handleClick}/>
          <MenuItem name='Mídia' anchor='midia' handleClick={this.props.handleClick} />
        </div>
      </div>
    )
  }
}
