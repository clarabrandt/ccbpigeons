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
    this.showResultados = this.showResultados.bind(this);
    // this.getCopaMG = this.getCopaMG.bind(this);
  }

  componentDidMount() {
    this.showResultados();
    // this.getCopaMG();
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
  // getCopaMG() {
  //   const copa = this.props.api.getCopaMG();
  //   console.log(copa)
  //   copa.then((docs) =>{
  //     this.setState({
  //       copa: Object.values(docs.copa),
  //     })
  //   })
  // }


  showResultados() {
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
      <div className='results' ref={this.props.resultados}>
          <div className='results-title'>Resultados</div>
          <div className='competitions'>
            <div className='competitions-grid'>
              <div className='competitions-next'>
                <div className='competitions-next--title'>Próximas competições</div>
                <ul className='competitions-next--list'>
                  <li className='competitions-next--listItems'>7ª COPA MG</li>
                </ul>
              </div>
              <div className='competitions-last'>
                <div className='competitions-last--title'>Anteriores</div>
                <ul className='competitions-last--list'>
                  <li className='competitions-last--listItems'>2018</li>
                  <li className='competitions-last--listItems'>2017</li>
                  <li className='competitions-last--listItems'>2016</li>
                </ul>
              </div>
              </div>
              <div className='competitions-results'>
                <div className='competitions-results--title'>Resultados</div>
                  <ul className='competitions-results--list'>
                    {
                      this.state.resultados.map((res, index) => {
                        return (
                          <div key={index} className={`competitions-results--listItems ${this.state.open ? 'open' : 'closed' }`} onClick={ this.toggleList }>
                            <div>{res.name} </div>
                            
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