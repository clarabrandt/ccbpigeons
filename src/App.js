import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout.js';
import Login from './components/Login.js';

class App extends Component {
  
  render() {
    return (
      <div className='app'>
        <Switch>
          <Route path="/login" component={Login} /> 
          <Route exact path='/' component={Layout}/>
          <Route exact path='/home' component={Layout}/>
          <Route path="/about" component={Layout} /> 
          <Route path="/resultados" component={Layout} /> 
          <Route path="/blog" component={Layout} /> 
          <Route path="/midia" component={Layout} /> 
        </Switch> 
          {/* <Layout /> */}
      
      </div>
    );
  }
}

export default App;
