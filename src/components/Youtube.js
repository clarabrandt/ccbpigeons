import React, { Component } from 'react';
import './Youtube.css'

export default class Youtube extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    window.open('https://www.youtube.com/channel/UC_jv2lcttlRTPPhNR39-c7g')
  }
  render() {
    return (
      <div>
        <svg className='icon--youtube' onClick={this.handleClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" version="1.1" width="50px" height="50px">
          <g id="surface1">
          <path fill='#FF3D00' d="M 43.199219 33.898438 C 42.800781 36 41.101563 37.601563 39 37.898438 C 35.699219 
            38.398438 30.199219 39 24 39 C 17.898438 39 12.398438 38.398438 9 37.898438 C 6.898438 37.601563 5.199219 
            36 4.800781 33.898438 C 4.398438 31.601563 4 28.199219 4 24 C 4 19.800781 4.398438 16.398438 4.800781 
            14.101563 C 5.199219 12 6.898438 10.398438 9 10.101563 C 12.300781 9.601563 17.800781 9 24 9 C 30.199219 9 35.601563 
            9.601563 39 10.101563 C 41.101563 10.398438 42.800781 12 43.199219 14.101563 C 43.601563 16.398438 44.101563 19.800781 
            44.101563 24 C 44 28.199219 43.601563 31.601563 43.199219 33.898438 Z "/>
          <path fill='#FFFFFF' d="M 20 31 L 20 17 L 32 24 Z "/>
          </g>
        </svg>
      </div>
    )
  }
}
