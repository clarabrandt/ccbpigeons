import React, { Component } from 'react';
import './Layout.css'

export default class Layout extends Component {
  render() {
    const pigeon = require("./images/campeonato.jpg")
    return (
      <div className='faixa'>
        <img src={pigeon} className='pigeon--pic' alt="" width='100%' height='350px' />
      </div>
    )
  }
}
