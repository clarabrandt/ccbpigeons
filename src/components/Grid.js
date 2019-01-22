import React, { Component } from 'react';
import Header from './Header';
import Menu from './Menu';
import Content from './Content';
import Footer from './Footer';

export default class Grid extends Component {

  handleClick(clickedItem) {
    console.log(clickedItem)
    if (clickedItem=== 'Home') {
      console.log('Pombos')
    }
    if(clickedItem === 'Pombos'){
      console.log('Pombos')
    } 
    if(clickedItem === 'Resultados'){
      console.log('Resultados')
    } 
    if(clickedItem === 'Leilões'){
      window.open('http://www.ccbleiloes.com.br/')
    } 
    if(clickedItem === 'Blog'){
      console.log('blog')
    } 
    
  }

  render() {
    return (
      <div>
        <Header />
        <Menu handleClick = { this.handleClick } />
        <Content />
        <Footer />
      </div>
    )
  }
}
