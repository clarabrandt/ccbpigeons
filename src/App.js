import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import Menu from './components/Menu.js';
import Content from './components/Content.js';
import Footer from './components/Footer.js';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='grid'>
          <Header />
          <Menu />
          <Content />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
