import React, { Component } from 'react';
import './About.css';
// import Videos from './Videos.js';
// import Youtube from './Youtube.js'


export default class About extends Component {

  constructor(props) {
    super(props)
    this.state= {
      sobre:[]
    }
    
    this.showSobre = this.showSobre.bind(this);
    // this.getCopaMG = this.getCopaMG.bind(this);
  }
  

  componentDidMount() {
    this.showSobre();
   
  };

  showSobre() {
    const sobre = this.props.api.getSobre();
    sobre.then((docs) =>{
      this.setState({
        sobre: Object.values(docs.sobre),
      })
    })
  }

  render() {
    // const house = require("./images/pombal_interior.jpg")
    const house = require("./images/ccbpombinho.jpg")
    
    return (
      <div className='about' ref={this.props.sobre} >
        {/* <div className='content--left'>
        <div className='news'>
          <h3>Notícias</h3>
          <h4>>> 11/01/2019 Prêmio melhor pombo do ano CCB Pigeons</h4>
          <h4>>> 05/01/2019 Peça seu catálogo para o próximo leilão da CCB Pigeons</h4>
        </div>
        </div> */}
        <div className='content-about'>
          {/* <div className='about-title'>Sobre o CCB Pigeons</div> */}
          {
            this.state.sobre.map((res, index) => {
              return (
                <div key={index} className= 'post-new--content'>
                  <div className='about-content'>
                    {res.sobre}
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='content-about--right'>
          <img src={house} className='house-pic' alt=""  />
         {/* <div className='videos'>
          <Videos videoId='OShgy4uv894'/>
         </div>
        <div className='canal-youtube--text'>Para mais vídeos, acesse: </div>
        <div className='canal-youtube'>
          <Youtube /> 
          <div className='canal-youtube--text'> Octávio Riberio Júnior</div>
         </div> */}
        </div>
      </div>
    )
  }
}

