import React, { Component } from 'react';
import './Resultados.css'
export default class Resultados extends Component {
  
  render() {
    return (
      <div className='results' ref={this.props.resultados}>
          <div className='results--title'>Competições e Resultados</div>
          <div className='results-list'>
            <ul>
              <li>Resultados 6ª COPA MG</li>
              <li>Competiçao 2</li>
              <li>Competiçao 3</li>
              <li>Competiçao 4</li>
              <li>Competiçao 5</li>
              <li>Competiçao 6</li>
            </ul>
          </div>
        </div>
    )
  }
}