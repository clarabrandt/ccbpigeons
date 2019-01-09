import React, { Component } from 'react';
import './Leiloes.css'

export default class Leiloes extends Component {
  handleClick () {
    window.open('http://www.ccbleiloes.com.br/')
  }
  render() {
    return (
      
    <div className='leiloes' onClick={this.handleClick}> CCB Leilões </div>

    
    )}
    
}
