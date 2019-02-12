import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { HashLink as Link } from 'react-router-hash-link'

import About from './About';
import Midia from './Midia';
import Resultados from './Resultados';
import Blog from './Blog';
// import Login from './Login';
import Footer from './Footer';
import Banner from './Banner';



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

    this.layout = React.createRef();
    this.top = React.createRef();
    this.midia = React.createRef();
    this.about = React.createRef();
    this.results = React.createRef();
    this.blog = React.createRef();
    this.menu = React.createRef();
    this.arrow = React.createRef();
  }
  

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.navigateToPage();
  };
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  };

  navigateToPage() {
    console.log(this.props.match)
    if (this.props.match.path) {
      this.handleClick(this.props.match.path.slice(1));
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
    if (clicked === 'about') {
      this.smoothScroll(this.about); 
    }
    if (clicked === 'arrow') {
      this.smoothScroll(this.about);
    }
    if (clicked === 'results') {
      this.smoothScroll(this.results);
    }
    if (clicked === 'blog') {
      this.smoothScroll(this.blog);
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
          <Banner handleClick={this.handleClick} menu={this.menu} about={this.about} sticky={this.state.sticky}/>
          <About about={this.about}/>
          <Resultados results={this.results}/>
          <Blog blog={this.blog}/>
          <Midia midia={this.midia}/>
          <Footer />
        </div>
      </div>
    )
  }
}
