import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './MenuItem.css';
// import Icon from './Icon';

export default class MenuItem extends Component {

  render() {
    return (
      <div className='menu--item--style'>
        <NavLink style={{ textDecoration: 'none' }} className='menu--item' to={this.props.anchor} onClick={() => this.props.handleClick(this.props.anchor)}>
          {/* <div className='icon'>
          <Icon name={this.props.name}/>
          </div> */}
          <div className='name'>
          {this.props.name}
          </div>
        </NavLink>
      </div>
    )
  }
}
