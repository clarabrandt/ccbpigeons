import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import Menu from './components/Menu.js';
import Content from './components/Content.js';
import Footer from './components/Footer.js';

class App extends Component {

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
      <div className='app'>
        <div className='grid'>
          <Header />
          <Menu handleClick={this.handleClick} />
          <Content />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
