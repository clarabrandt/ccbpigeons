import React, { Component } from 'react';
import About from './About';
import Midia from './Midia';
import Resultados from './Resultados';
import Blog from './Blog';
// import Login from './Login';
import Footer from './Footer';
import Banner from './Banner';
import jump from 'jump.js';


import './Layout.css';
window.jump = jump;

export default class Layout extends Component {

  constructor(props) {
    super(props)
    this.state= {
      clicked: 'Home',
      sticky: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.layout = React.createRef();
    this.midia = React.createRef();
    this.about = React.createRef();
    this.result = React.createRef();
    this.post = React.createRef();
    this.menu = React.createRef();
    
  }
  
  
  handleClick(clicked) {
    this.setState({
      clicked
    });
    console.log(clicked)
    if (clicked === '.leiloes') {
      window.open('http://www.ccbleiloes.com.br/') 
    } else {
      jump(clicked, {
        duration: 1000,
        offset: 0,
        callback: undefined,
        a11y: false
      });
    }
  }

  onScroll() {
    if(this.layout.current.scrollTop === null) {
      this.setState({
        sticky: false
      })
    } else {
    if(this.layout.current.scrollTop > 0) {
      this.setState({
        sticky: true
      })
    } else {
      this.setState({
        sticky: false
      })
    }
  }
}
  
  render() {
    return (
      <div className='layout' ref={this.layout} onScroll={this.onScroll}>
        <div>
          <Banner handleClick={this.handleClick} menu={this.menu} about={this.about} sticky={this.state.sticky}/>
          <About about={this.about}/>
          <Resultados result={this.result}/>
          <Blog post={this.post}/>
          <Midia midia={this.midia}/>
          <Footer />
        </div>
      </div>
    )
  }
}
