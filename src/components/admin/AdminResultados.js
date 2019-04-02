import React, { Component } from 'react';
import './AdminResultados.css'

export default class AdminResultados extends Component {

  baseUrl = 'https://us-central1-pigeon-90548.cloudfunctions.net/api/';

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      subitems: [],
      key: null,
    }
    this.handleClick = this.handleClick.bind(this);
    this.displayDetails = this.displayDetails.bind(this);
  }

  componentDidMount(){
    this.fetchEventos()
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: data.resultados
        })
      })
  }

  fetchEventos() {
    const endpoint = `${this.baseUrl}resultados`;
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  }

  displayDetails() {
    this.fetchArquivos()
      .then(response => response.json())
      .then(data => {
        this.setState({
          subitems: data,
        })
      })
  }

  fetchArquivos() {
    const { key }  = this.state
    const endpoint = `${this.baseUrl}resultados/${key}`;
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  }

  handleClick(e) {
    const key = e.target.id;
    this.setState({
      key
    }, this.displayDetails)
  }

  renderList(){
    const { items } = this.state;
    return(
      <div className= 'admin-panel--list'>
        { 
          Object.keys(items).map((key) => {
            return (
              <div key={ key } className='admin-panel--item' onClick={this.handleClick}>
                <div className='admin-panel--item--title' id={ key }>{items[key].nome}</div>
              </div>
            )
          })
        }  
      </div>
    )
  }


  render() {
    return( 
      <div className="columns" id="resultados">
        <div className="column is-6 messages hero is-fullheight" id="eventos">
          <div className='admin-panel--content'>
            {this.renderList()}
            <div className='buttons'>
              <button onClick={ this.props.goBack }>Voltar</button>
              <button onClick={ this.addResultados }>Nova notícia</button>
            </div>
          </div>
        </div>
        <div className="column is-6 messages hero is-fullheight is-fullwidth" id="arquivos">
          <div className='admin-panel--content'>
            {this.state.subitems.map((subitem) => {
              return (
                <div>
                  <a href={subitem.url} target="_blank">{subitem.nome}</a>
                </div>
              )
            })}

            <div>
              <input type="file" />
              <button type="button">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
