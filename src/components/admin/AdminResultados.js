import React, { Component } from 'react';
import './AdminResultados.css'

export default class AdminResultados extends Component {

  baseUrl = 'https://us-central1-pigeon-90548.cloudfunctions.net/api/';

  constructor(props) {
    super(props);
    this.state = {
      items: {},
    }
  }

  componentDidMount(){
    this.fetchData()
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: data.resultados
        })
      })
  }

  fetchData() {
    const endpoint = `${this.baseUrl}resultados`;
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  }

  renderList(){
    const { items } = this.state;
    return(
      <div className= 'admin-panel--list'>
        { 
          Object.keys(items).map((key) => {
            return (
              <div key={ key } className='admin-panel--item'>
                <div className='admin-panel--item--title'>{items[key].nome}</div>
              </div>
            )
          })
        }  
      </div>
    )
  }


  render() {
    return( 
      <div className='admin-panel--content'>
        {this.renderList()}
        <div className='buttons'>
          <button onClick={ this.props.goBack }>Voltar</button>
          <button onClick={ this.addResultados }>Nova notícia</button>
        </div>
      </div>
    )
  }
}
