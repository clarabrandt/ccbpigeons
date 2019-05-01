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
    return (
      <div className="lateral">
        <div className="lateral-content">
          <div className="artigos">
            <div className="artigos-titulo"> Artigos </div>
            {this.state.artigos.map((res, index) => {
              return (
                <div key={index} className="artigos-conteudo">
                  <div className="post-title">{res.title} </div>
                </div>
              );
            })}
          </div>
          <div className="competitions-images">
            <div className="competitios-pics--title "> Fotos </div>

            {this.state.fotos.map((res, index) => {
              return (
                <div key={index} className="pics-content">
                  <div className="post-title">{res.foto} </div>
                </div>
              );
            })}

            <img src={pigeon} className="pigeon--pic" alt="" />
            <img src={pigeon} className="pigeon--pic" alt="" />
            <img src={pigeon} className="pigeon--pic" alt="" />
            <img src={pigeon} className="pigeon--pic" alt="" />
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
