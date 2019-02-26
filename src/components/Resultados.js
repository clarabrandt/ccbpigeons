import React, { Component } from 'react';

import { db, storage } from '../base';
import './Resultados.css'

export default class Resultados extends Component {
  constructor(props) {
    super(props)
    this.state= {
      resultados: [],
      open: false
    }
    this.toggleList = this.toggleList.bind(this);
    this.getResultados = this.getResultados.bind(this);
  }

  componentDidMount() {
    this.getResultados();
  };

  toggleList() {
    if(this.state.open === false) {
      this.setState({
        open: true
      })
    } else {
      this.setState({
        open: false
      })
    }
  }



  getResultados() {
    const resultados = this.props.api.getResultados();
    resultados.then((docs) =>{
      this.setState({
        resultados: Object.values(docs.resultados),
      })
    })
  }

  render() {
    const pigeon = require("./images/pombo-correio.jpg")
    return (
      <div className='content-results' ref={this.props.resultados}>
          <div className='results-title'>Resultados</div>
          <div className='competitions'>
            <div className='competitions-next'>
              <div className='competitions-next--title'>Próximas competições</div>
              <ul className='competitions-next--list'>
                <li>7ª COPA MG</li>
              </ul>
            </div>
              <div className='competitions-results'>
                <div className='competitions-results--title'>Resultados</div>
                  <ul className='competitions-results--list'>
                    {
                      this.state.resultados.map((res, index) => {
                        return (
                          <div key={index} className={`competitions-results--listItems ${this.state.open ? 'open' : 'closed' }`} onClick={ this.toggleList }>
                            <a href={`http://${res.url}`}>{res.nome}</a>
                            {/* <div onClick={() => this.renderOptions()}>{res.name}</div> */}
                          </div>
                        )
                      })
                    }
                  </ul>
              </div>
              <div className='competitions-images'>
                <div className='competitions-next--title'>Fotos</div>
                <img src={pigeon} className='pigeon--pic' alt=""  />
              </div>
               
             {/* <ul>
              {
                this.state.resultados.map((res) => {
                  return (
                    <div>
                      <div className="teamo">{res.nome}</div>
                      <div>
                        <a href={`http://${res.url}`}>{res.nome}</a>
                      </div>
                    </div>
                  )
                })
              }
            </ul> */}
          </div>
      </div>
    )
  }
}