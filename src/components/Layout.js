import React, { Component } from 'react';
import api from '../utils/api.js';
// import { Link } from 'react-router-dom';
// import { HashLink as Link } from 'react-router-hash-link'

import About from './About';
import Midia from './Midia';
import Resultados from './Resultados';
import Blog from './Blog';
import Login from './Login';
import Footer from './Footer';
import Banner from './Banner';

import { db, storage } from '../base';



import './Layout.css';
export default class Layout extends Component {

  constructor(props) {
    super(props)
    this.state= {
      clicked: '',
      sticky: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.api = new api();
    this.layout = React.createRef();
    this.top = React.createRef();
    this.midia = React.createRef();
    this.sobre = React.createRef();
    this.resultados = React.createRef();
    this.blog = React.createRef();
    this.getResultados = this.getResultados.bind(this);
  }
  

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.navigateToPage();
    this.getResultados();
    // this.getFiles();
  };

  getResultados() {
    const resultados = this.api.getResultados();
    resultados.then((docs) =>{
      this.setState({
        resultados: docs.resultados,
      })
    })
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  };

  navigateToPage() {
    if (this.props.match.path) {
      this.handleClick(this.props.match.path.slice(1));
    }
    if (this.props.match.path.slice(1) === 'leiloes') {
      console.log(this.props.match)
    }
  }
  
  smoothScroll(clicked) {
    console.log('chamou smooothscroll');
    clicked.current.scrollIntoView({block: 'start', behavior: 'smooth'});
  }
  
  handleClick(clicked) {
    this.setState({
      clicked
    });
    if (clicked === 'leiloes') {
      window.open('http://www.ccbleiloes.com.br/') 
    } 
    if (clicked === 'home') {
      this.smoothScroll(this.top)
    }
    if (clicked === 'midia') {
      this.smoothScroll(this.midia);
    }
    if (clicked === 'sobre') {
      this.smoothScroll(this.sobre); 
    }
    if (clicked === 'arrow') {
      this.smoothScroll(this.sobre);
    }
    if (clicked === 'resultados') {
      this.smoothScroll(this.resultados);
    }
    if (clicked === 'blog') {
      this.smoothScroll(this.blog);
    }
    if (clicked === 'login') {
      window.open(<Login />)
    }
  }

  onScroll() {
    if(this.layout.current.scrollTop === null || this.layout.current.scrollTop <= 0) {
      this.setState({
        sticky: false
      })
    } else {
      this.setState({
        sticky: true

      })
    }
  }
  
  render() {
   
    return (
      <div id='layout' className='layout' ref={this.layout} onScroll={this.onScroll}>
        <div>
          <div ref={this.top} />
          <Banner handleClick={this.handleClick} sobre={this.sobre} sticky={this.state.sticky}/>
          <About sobre={this.sobre}/>
          <Blog blog={this.blog}/>
          <Resultados resultados={this.resultados} handleClick={this.handleClick} api={this.api}/>
          <Midia midia={this.midia}/>
          <Footer />
        </div>
      </div>
    )
  }
}
