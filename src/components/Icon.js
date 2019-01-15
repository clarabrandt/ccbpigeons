import React, { Component } from 'react';
import Prize from './svgs/Prize';
import Home from './svgs/Home';
import Blog from './svgs/Blog';
import Dove from './svgs/Dove';
import Leilao from './svgs/Leilao';


export default class Icon extends Component {
  renderIcons() {
    if(this.props.name === 'Home' ) {
      return (<Home />)
    }
    if(this.props.name === 'Pombos') {
      return (<Dove />)
    }
    if(this.props.name === 'Resultados') {
      return (<Prize />)
    }
    if(this.props.name === 'Leilões') {
      return (<Leilao />)
    }
    if(this.props.name === 'Blog') {
      return (<Blog />)
    }

  } 

  render() {
    return (
      <div>
        {
          this.renderIcons() 
        } 
      </div>
    )
  }
}
