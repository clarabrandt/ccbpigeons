import React, { Component, Fragment } from 'react';
import {DetalhesComponent} from './_detalhes.js'
import './style.css'

export default class Resultados extends Component {

  baseUrl = 'https://us-central1-pigeon-90548.cloudfunctions.net/api/';

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      subitems: {},
      snapshot: {},
      selecionado: null,
    }

    this.handleClick = this.handleClick.bind(this);
    this.displayDetails = this.displayDetails.bind(this);
    this.fetchArquivos = this.fetchArquivos.bind(this);
    this.updateSubitem = this.updateSubitem.bind(this);
  }

  componentDidMount(){
    this.fetchData()
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: data.resultados,
          selecionado: Object.keys(data.resultados)[0],
        }, this.displayDetails)
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

  displayDetails() {
    this.fetchArquivos()
      .then(response => response.json())
      .then(subitems => {
        const result = {};
        subitems.map((file) => {
          result[file.id] = file.data;
        })

        this.setState({
          subitems: result,
        })
      })
  }

  updateSubitem(i, file, done = false, snapshot = {}) {
    this.setState({
      subitems: {
        ...this.state.subitems,
        [i]: {done, snapshot, name: file.name},
      }
    });
  }

  fetchArquivos() {
    const { selecionado }  = this.state
    const endpoint = `${this.baseUrl}resultados/${selecionado}`;
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  }

  handleClick(e) {
    const selecionado = e.target.id;
    this.setState({
      selecionado
    }, this.displayDetails)
  }

  renderList(){
    const { items, selecionado, subitems } = this.state;
    console.log('subitems : ', subitems)
    return(
      <div className= 'admin-panel--list'>
        { 
          Object.keys(items).map((key) => {
            return (
              <Fragment key={key}>
                <div className='admin-panel--item'  onClick={this.handleClick}>
                  <div id={key} className='admin-panel--item--title' >{items[key].nome}</div>
                </div>
                <DetalhesComponent 
                  id={key} 
                  open={key === selecionado ? 'open' : ''} 
                  subitems={subitems} 
                  displayDetails={this.displayDetails} 
                  updateSubitem={this.updateSubitem} 
                />
              </Fragment>
            )
          })
        }  
      </div>
    )
  }

  render() {
    return( 
      <div className="columns" id="resultados">
        <div className="column is-12 messages hero is-fullheight" id="eventos">
          <div className='admin-panel--content'>
            {this.renderList()}
            <div className='buttons'>
              <button onClick={ this.props.goBack }>Voltar</button>
              <button onClick={ this.addResultados }>Nova notícia</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
