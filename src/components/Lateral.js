import React, { Component } from 'react';
// import './Lateral.css';
import './Layout.css'

export default class Lateral extends Component {
  render() {
    const pigeon = require("./images/pombo-correio.jpg")
    return (
      <div className='lateral'>
        <div className='lateral-content'>
          <div className='artigos'>
            <div className='artigos-titulo'>Artigos</div>
            <div className='artigos-conteudo'> Artigo um</div>
            <div className='artigos-conteudo'> Artigo dois</div>
          </div>
          <div className='competitions-images'>
            <div className='competitios-pics--title '>Fotos</div>
            <img src={pigeon} className='pigeon--pic' alt=""  />
            <img src={pigeon} className='pigeon--pic' alt=""  />
            <img src={pigeon} className='pigeon--pic' alt=""  />
            <img src={pigeon} className='pigeon--pic' alt=""  />
          </div>
          <div className='anuncios'>
          <div>
          <div className='anuncios-title'>Anuncios</div>
          </div>
          <div className='anuncios-content'>
            <div className='anuncios-content--'>Anuncie aqui!</div>
            <div className='anuncios-content--'>Anuncie aqui!</div>
            <div className='anuncios-content--'>Anuncie aqui!</div>
          </div>
        </div>
        </div>
        
      </div>
    )
  }
}
