import React, { Component } from 'react';
import './MenuItem.css'

export default class MenuItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(event) {
    if (this.props.name=== 'Home') {
      
    }
    if(this.props.name === 'Pombos'){
      console.log('Pombos')
    } 
    if(this.props.name === 'Resultados'){
      console.log('Resultados')
    } 
    if(this.props.name === 'Leilões'){
      window.open('http://www.ccbleiloes.com.br/')
    } 
    if(this.props.name === 'Blog'){
      console.log('blog')
    } 
    
  }

  render() {
    return (
      <div className='menu--item' onClick={this.handleClick}>
        <div className='icon'>
        {/* <svg className='icon icon--home' xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 224 224" width="28px" height="28px">
          <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" >
          <path d="M0,224v-224h224v224z" fill="none"/>
          <g id="original-icon" fill="#cccccc"><path d="M112,19.59635l-102.66667,92.40365h28v84h65.33333v-56h18.66667v56h65.33333v-84h28zM112,44.71615l56,50.40364v7.54688v74.66667h-28v-56h-56v56h-28v-82.21354z"/>
          </g></g>
        </svg> */}
        </div>
        {this.props.name}

      </div>
    )
  }
}
