import React, { Component } from 'react';
import './Midia.css';
import Videos from './Videos.js';
import Youtube from './Youtube.js'

export default class Midia extends Component {
  render() {
    const pigeon = require("./images/pombo-correio.jpg")
    return (
      <div className='midia' ref={this.props.midia}>
        <div className='midia--title'>Mídia</div>
        <div className='midia--content'>
        <div className='videos'>
            <Videos videoId='OShgy4uv894'/>
        <div className='canal-youtube--text'>Para mais vídeos, acesse: </div>
        <div className='canal-youtube'>
          <Youtube /> 
          <div className='canal-youtube--text'> Octávio Riberio Júnior</div>
        </div>
        </div>
        <div className='card' >
          <div className="card--grid">
            Pombo 1
            <div className='card--pic'>
              <img src={pigeon} alt="" width='100px' height='100px' />
            </div>
            <div className="card--text">
              <p>Descrição</p> 
            </div>
          </div>
          <div className="card--grid">
            Pombo 2
            <div className='card--pic'>
              <img src={pigeon} alt="" width='100px' height='100px' />
            </div>
            <div className="card--text">
              <p>Descrição</p> 
            </div>
          </div>
          <div className="card--grid">
            Pombo 3 
            <div className='card--pic'>
              <img src={pigeon} alt="" width='100px' height='100px' />
            </div>
            <div className="card--text">
              <p>Descrição</p> 
            </div>
          </div>
          <div className="card--grid">
            Pombo 4 
            <div className='card--pic'>
              <img src={pigeon} alt="" width='100px' height='100px' />
            </div>
            <div className="card--text">
              <p>Descrição</p> 
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

 /* <div className='content--left'>
        
        </div>
        <div className='content--main'>
          POMBO
        </div>
        <div className='content--right'>
         
        </div> */