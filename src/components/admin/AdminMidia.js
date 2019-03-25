import React, { Component, Fragment } from 'react';
import './AdminMidia.css'


export default class AdminMidia extends Component {

  baseUrl = 'https://us-central1-pigeon-90548.cloudfunctions.net/api/';

  constructor(props) {
    super(props);
    this.state = {
      noticia: ''
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
    const endpoint = `${this.baseUrl}midia`;
    event.preventDefault();
    const data = { noticia: this.state.noticia };
    
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    console.log(this.state.noticia)
  }

  render() {
    return (
      <Fragment>
        <form className='postNews'>
          <div>Nova notícia</div>
          <textarea type='text' id='noticia' name='noticia' placeholder='texto' onChange={ this.handleChange }/>
          <div className='buttons'>
            <button onClick={ this.props.goBack }>Voltar</button>
            <button onClick={ this.handleClick }>Postar</button>
          </div>
        </form>
      </Fragment>

    )
  }
}

