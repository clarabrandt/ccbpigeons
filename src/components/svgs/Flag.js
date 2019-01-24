import React, { Component } from 'react';

export default class Flag extends Component {
  render() {
    return (
      <svg className='flag' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" version="1.1" width="30px" height="30px">
        <g id="surface1">
          <path fill="#4CAF50" d="M 2 9 L 46 9 L 46 39 L 2 39 Z "/>
          <path fill="yellow" d="M 42 24 L 24 36 L 6 24 L 24 12 Z "/>
          <path fill="#3F51B5" d="M 31 24 C 31 27.867188 27.867188 31 24 31 C 20.132813 31 17 27.867188 17 24 C 17 20.132813 20.132813 17 24 17 C 27.867188 17 31 20.132813 31 24 Z "/>
          <path fill="#FFFFFF" d="M 17.804688 20.746094 C 17.464844 21.390625 17.230469 22.09375 17.105469 22.835938 C 19.359375 22.558594 25.484375 22.273438 30.640625 26.210938 C 30.871094 25.515625 31 24.773438 31 24 C 31 24 31 23.996094 31 23.992188 C 26.058594 20.644531 20.65625 20.511719 17.804688 20.746094 Z "/>
        </g>
      </svg>
    )
  }
}