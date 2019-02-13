import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout.js';
import Login from './components/Login.js';

class App extends Component {
  
  render() {
    return (
      <div className='app'>
        <BrowserRouter basename={process.env.PUBLIC_URL}></BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} /> 
          <Route exact path='/' component={Layout}/>
          <Route path='/home' component={Layout}/>
          <Route path="/sobre" component={Layout} /> 
          <Route path="/resultados" component={Layout} /> 
          <Route path="/blog" component={Layout} /> 
          <Route path="/midia" component={Layout} /> 
        </Switch> 
      </div>
    );
  }
}

export default App;
