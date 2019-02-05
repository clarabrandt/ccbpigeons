import React, { Component } from 'react';
// import Header from './Header';
// import Menu from './Menu';
import Content from './Content';
import Pombos from './Pombos';
import Resultados from './Resultados';
import Blog from './Blog';
// import Login from './Login';
import Footer from './Footer';
import Banner from './Banner';
import jump from 'jump.js';

export default class Layout extends Component {

  constructor(props) {
    super(props)
    this.state= {
      clicked: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.layout = React.createRef();
    this.pombos = React.createRef();
  }

  handleClick(clicked) {
    this.setState({
      clicked
    });
    if (clicked === 'Leilões'){
      window.open('http://www.ccbleiloes.com.br/') 
    } else {
      let position = this.getElementPosition(clicked);
      // window.scrollTo(0, position);
      jump(position, {
        duration: 1000,
        offset: 0,
        callback: undefined,
        a11y: false
      } )
    }
  }

  getElementPosition(clicked) {
    if(clicked === 'Pombos'){
      return this.pombos.current.offsetTop;
    } 
  }

  render() {
    return (
      <div ref={this.layout}>
        {/* <Header handleClick = { this.handleClick }/> 
        <Menu handleClick = { this.handleClick } /> 

        {this.state.clicked === 'Login' &&
        <Login />
        }

        {this.state.clicked === 'Home' &&
        <Banner handleClick = { this.handleClick }/>
        }
        {this.state.clicked === 'Home' && 
        <Content />
        }
        {this.state.clicked === 'Pombos' && 
        <Pombos />
        }
        {this.state.clicked === 'Blog' && 
        <Blog />
        }
        {this.state.clicked === 'Resultados' && 
        <Resultados />
        } */}
        <Banner handleClick={this.handleClick}/>
        <Content />
        <Pombos anchor={this.pombos}/>
        <Resultados />
        <Blog />
        <Footer />
      </div>
    )
  }
}
