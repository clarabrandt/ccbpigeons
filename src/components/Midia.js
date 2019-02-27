import React, { Component } from 'react';
import './Midia.css';
import Videos from './Videos.js';
import Youtube from './Youtube.js'

export default class Midia extends Component {


  componentDidMount() {
    console.log(this.promessa.then(
      (x) => console.log(x)
    ).catch(err => console.log(err))
    );
  }

  promessa = new Promise((resolve, reject) =>  {
    const x = 2;
    if (x > 5 ){
      resolve('Maior');
    }else {
      reject('O numero e menor que 5');
    }
  })


  render() {
    // const pigeon = require("./images/pombo-correio.jpg")
    return (
      <div id='midia' className='midia' ref={this.props.midia}>
        <div className='midia-title'>Mídia</div>
        <div className='midia-content'>
          <div className='videos'>
            <div className='videos-subtitle'>Vídeos</div>
            <div className='videos-text'>Mais populares no canal</div>
            <div className='videos-content'>
              <Videos videoId='2EfbpSfrHTY'/>
              <Videos videoId='OnRJRoL89ME'/>
            </div>
            <div className='canal-youtube--text'>Para mais vídeos, acesse: </div>
            <div className='canal-youtube'>
              <Youtube /> 
              <div className='canal-youtube--text'> Octávio Ribeiro Júnior</div>
            </div>
          </div>
          <div className='news'>
            <div className='news-subtitle'>Notícias</div>
            <div className='news-content'>Próximo leilão será anunciado em breve!</div>
            <div className='news-content'>Notícia 2 </div>
            <div className='news-content'>Notícia 3 </div>
          </div>
          {/* <div className='foto' >
            <div className='midia--subtitle'>Fotos</div>
            <div className='card' >
            <div className="card--grid">
              Pombo 1
              <div className='card--pic'>
                <img src={pigeon} alt="" width='100px' height='100px' />
              </div>
              <div className="card--text">
                <p>Descrição</p> 
              </div>
            </div>
            <div className="card--grid">
              Pombo 2
              <div className='card--pic'>
                <img src={pigeon} alt="" width='100px' height='100px' />
              </div>
              <div className="card--text">
                <p>Descrição</p> 
              </div>
            </div>
            <div className="card--grid">
              Pombo 3 
              <div className='card--pic'>
                <img src={pigeon} alt="" width='100px' height='100px' />
              </div>
              <div className="card--text">
                <p>Descrição</p> 
              </div>
            </div>
            <div className="card--grid">
              Pombo 4 
              <div className='card--pic'>
                <img src={pigeon} alt="" width='100px' height='100px' />
              </div>
              <div className="card--text">
                <p>Descrição</p> 
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    )
  }
}

 /* <div className='content--left'>
        
        </div>
        <div className='content--main'>
          POMBO
        </div>
        <div className='content--right'>
         
        </div> */