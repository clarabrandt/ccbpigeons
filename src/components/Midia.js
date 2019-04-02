import React, { Component } from 'react';
import './Midia.css';
import Videos from './Videos.js';
import Youtube from './Youtube.js'

export default class Midia extends Component {
  constructor(props) {
    super(props)
    this.state= {
      midia: []
    }
    
    this.showMidia = this.showMidia.bind(this);
  }

  componentDidMount() {
    this.showMidia();
  };

  showMidia() {
    const midia = this.props.api.getMidia();
    midia.then((docs) =>{
      this.setState({
        midia: Object.values(docs.midia),
        
      })
    })
  }

  


  render() {
    // const pigeon = require("./images/pombo-correio.jpg")
    return (
      <div id='midia' className='midia' ref={this.props.midia}>
        <div className='midia-content'>
          <div className='midia-title'>Mídia</div>
          <div className='midias'>
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
            
                {
                  this.state.midia.map((res, index) => {
                    return (
                      <div key={index} className= 'news-new--content'>
                        <div className='news-title'>{res.titulo} </div>
                        <div className='news-content'>
                          <p>{res.conteudo}</p> 
                        </div>
                      </div>
                    )
                  })
                  }
            </div>
          </div>
        </div>
        <div className='anuncios'>Anúncios</div>
      </div>
    )
  }
}

 