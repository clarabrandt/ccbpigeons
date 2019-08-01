import React, { Component } from "react";
// import './Lateral.css';
import "./Lateral.css";

export default class Lateral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fotos: [],
      artigos: []
    };

    this.showFotos = this.showFotos.bind(this);
    this.showArtigos = this.showArtigos.bind(this);
  }
  componentDidMount() {
    this.showFotos();
    this.showArtigos();
  }

  showFotos() {
    const fotos = this.props.api.getFotos();
    fotos.then(docs => {
      this.setState({
        fotos: Object.values(docs.fotos)
      });
    });
  }
  showArtigos() {
    const artigos = this.props.api.getArtigos();
    artigos.then(docs => {
      this.setState({
        artigos: Object.values(docs.artigos)
      });
    });
  }

  render() {
    const pigeon = require("./images/pombo-correio.jpg");
    const { fotos } = this.state

    return (
      <div className="lateral">
        <div className="lateral-content">
          <div className="artigos">
            <div className="artigos-title"> Artigos </div>
            {this.state.artigos.map((res, index) => {
              const file_url = `https://firebasestorage.googleapis.com/v0/b/pigeon-90548.appspot.com/o/${encodeURIComponent(res.url)}?alt=media`
              return (
                <div key={index} className="artigos-conteudo">
                  <div className="artigos-conteudo--title">
                    <a target="_blank" rel="noopener noreferrer" href={file_url}>{res.name}</a>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="competitions-images">
            <div className="competitions-pics--title "> Fotos </div>

            {fotos.map((res, index) => {
              return (
                <div key={index} className="pics-content">
                  <img src={res.url} className="pigeon--pic" alt="foto" width='100px' height='100px' />
                </div>
              );

            })}


          </div>
          <div className="anuncios">
            <div>
              <div className="anuncios-title"> Anúncios </div>
            </div>
            <div className="anuncios-content">
              <div className="anuncios-content--"> Anuncie aqui! </div>
              <div className="anuncios-content--"> Anuncie aqui! </div>
              <div className="anuncios-content--"> Anuncie aqui! </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
