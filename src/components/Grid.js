import React, { Component } from 'react';
import Header from './Header';
import Menu from './Menu';
import Content from './Content';
import Pombos from './Pombos';
import Resultados from './Resultados';
import Blog from './Blog';
import Login from './Login';
import Footer from './Footer';
import Layout from './Layout';

export default class Grid extends Component {

  constructor(props) {
    super(props)
    this.state= {
      clicked: 'Home'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(clickedItem) {
    if (clickedItem === 'Home') {
      this.setState({
        clicked: 'Home'
      })
    }
    if(clickedItem === 'Pombos'){
      this.setState({
        clicked: 'Pombos'
      })
    } 
    if(clickedItem === 'Resultados'){
      this.setState({
        clicked: 'Resultados'
      })
    } 
    if(clickedItem === 'Leilões'){
      window.open('http://www.ccbleiloes.com.br/')
    } 
    if(clickedItem === 'Blog'){
      this.setState({
        clicked: 'Blog'
      })
    } 
    if(clickedItem === 'Login'){
      this.setState({
        clicked: 'Login'
      })
    } 
    
  }

  render() {
    return (
      <div>
        <Header />
        <Menu handleClick = { this.handleClick } />
        {this.state.clicked === 'Home' &&
        <Layout />
        }
        {this.state.clicked === 'Pombos' && 
        <Pombos />
        }
        {this.state.clicked === 'Home' && 
        
        <Content />
        }
        {this.state.clicked === 'Blog' && 
        <Blog />
        }
        {this.state.clicked === 'Resultados' && 
        <Resultados />
        }
        <Footer />
      </div>
    )
  }
}
