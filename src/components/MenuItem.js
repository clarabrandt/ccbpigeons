import React, { Component } from 'react';
import './MenuItem.css';
import Icon from './Icon';

export default class MenuItem extends Component {

  render() {
    return (
      <div className='menu--item' onClick={ () => this.props.handleClick(this.props.name) }>
        <div className='icon'>
        <Icon name={this.props.name}/>
        </div>
        <div className='name'>
        {this.props.name}
        </div>
      </div>
    )
  }
}
