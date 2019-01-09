import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import Menu from './components/Menu.js'

class App extends Component {
  render() {
    return (
      <div className='app'>
        <div className='grid'>
        <Header />
        <Menu />
        <div className='Content'></div>
        </div>
      </div>
    );
  }
}

export default App;
