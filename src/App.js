import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid.js';

class App extends Component {

  render() {
    return (
      <div className='app'>
        <div>
          <Grid />
        </div>
      </div>
    );
  }
}

export default App;
