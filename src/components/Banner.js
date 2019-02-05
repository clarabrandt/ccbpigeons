import React, { Component } from 'react'

import './Banner.css';
import Menu from './Menu';



export default class Banner extends Component {
  render() {
    const pigeon = require("./images/Overview_lofts.jpg")
    return (  
      <div className='faixa'>
          <img src={pigeon} className='pigeon--pic' alt=""  />
          <Menu handleClick={this.props.handleClick}/>
        <div className='new--title'>
          <div className='title--over--pic'>CCB Pigeons</div>
          <div className='subtitle'>Centro de Criação Brasil</div>
          <div className='arrow'></div>
        </div>
      </div>
     
    )
  }
}
