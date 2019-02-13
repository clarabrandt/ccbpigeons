import React, { Component } from 'react'
import './Banner.css';
import Menu from './Menu';



export default class Banner extends Component {
  render() {
    // const pigeon = require("./images/Overview_lofts.jpg")
    return (  
      <div className='faixa'>
          {/* <img src={pigeon} className='pigeon--pic' alt=""  /> */}
          <Menu handleClick={this.props.handleClick} sticky={this.props.sticky}/>
        <div className='new--title'>
          <div className='title--over--pic'>CCB Pigeons</div>
          <div className='subtitle'>Centro de Criação Brasil</div>
          <div className='arrow' ref={this.props.sobre} anchor='arrow'onClick={() => this.props.handleClick('arrow')} ></div>
        </div>
      </div>
     
    )
  }
}
