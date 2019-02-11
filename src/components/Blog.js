import React, { Component } from 'react';
import './Blog.css'

export default class Blog extends Component {
  render() {
    return (
      <div className='blog' ref={this.props.blog}>
        <div className='posts'>
        {/* <div className='posts--old'>
          <h3>Posts antigos</h3>
          <h4>>> 11/01/2019 Como vacinar seus pombos</h4>
          <h4>>> 05/01/2019 Transformando um hobby em trabalho</h4>
        </div> */}
        <div className='posts--new'>
          <div className='articles'>Artigos</div>
            <div className='articles--title'>Como vacinar seus pombos</div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
              deserunt mollit anim id est laborum.
            </p>
        </div>
        </div>
        
      </div>
    )
  }
}