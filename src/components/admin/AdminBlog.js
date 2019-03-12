import React, { Component, Fragment } from 'react';
import './AdminBlog.css'

export default class AdminBlog extends Component {

  baseUrl = 'https://us-central1-pigeon-90548.cloudfunctions.net/api/';

  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      conteudo: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleClick(event) {
    const endpoint = `${this.baseUrl}blog`;
    event.preventDefault();
    const data = { titulo: this.state.titulo, conteudo: this.state.conteudo };
    
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    console.log(this.state.titulo, this.state.conteudo)
  }

  render() {
    return (
      <Fragment>
        <form id='postData'>
          <input type='text' id='titulo' name='titulo' onChange={ this.handleChange } />
          <textarea type='text' id='conteudo' name='conteudo' onChange={ this.handleChange }/>
          <button onClick={ this.handleClick }>Enviar</button>
        </form>
        
      </Fragment>

    )
  }
}
