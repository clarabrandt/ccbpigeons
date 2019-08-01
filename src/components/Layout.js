import React, { Component } from "react";
import api from "../utils/api.js";
import About from "./About";
import Midia from "./Midia";
import Resultados from "./Resultados";
import Blog from "./Blog";
import Footer from "./Footer";
import Banner from "./Banner";
import Lateral from "./Lateral";

import "./Layout.css";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: "",
      sticky: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this.api = new api();

    this.layout = React.createRef();
    this.login = React.createRef();
    this.top = React.createRef();
    this.midia = React.createRef();
    this.sobre = React.createRef();
    this.resultados = React.createRef();
    this.blog = React.createRef();
    this.showResultados = this.showResultados.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
    this.navigateToPage();
    this.showResultados();
    this.showBlog();
    this.showSobre();
    this.showMidia();
    this.showFotos();
    this.showArtigos();
  }

  showResultados() {
    const resultados = this.api.getResultados();
    resultados.then(docs => {
      this.setState({
        resultados: docs.resultados
      });
    });
  }

  showBlog() {
    const blog = this.api.getBlog();
    blog.then(docs => {
      this.setState({
        blog: docs.blog
      });
    });
  }
  showSobre() {
    const sobre = this.api.getSobre();
    sobre.then(docs => {
      this.setState({
        sobre: docs.sobre
      });
    });
  }
  showMidia() {
    const midia = this.api.getMidia();
    midia.then(docs => {
      this.setState({
        midia: docs.midia
      });
    });
  }
  showFotos() {
    const fotos = this.api.getFotos();
    fotos.then(docs => {
      this.setState({
        fotos: docs.fotos
      });
    });
  }
  showArtigos() {
    const artigos = this.api.getArtigos();
    artigos.then(docs => {
      this.setState({
        artigos: docs.artigos
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  navigateToPage() {
    if (this.props.match.path) {
      this.handleClick(this.props.match.path.slice(1));
    }
    if (this.props.match.path.slice(1) === "leiloes") {
    }
  }

  smoothScroll(clicked) {
    clicked.current.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }

  handleClick(clicked) {
    this.setState({
      clicked
    });
    if (clicked === "leiloes") {
      window.open("http://www.ccbleiloes.com.br/");
    }
    if (clicked === "home") {
      this.smoothScroll(this.top);
    }
    if (clicked === "midia") {
      this.smoothScroll(this.midia);
    }
    if (clicked === "sobre") {
      this.smoothScroll(this.sobre);
    }
    if (clicked === "arrow") {
      this.smoothScroll(this.sobre);
    }
    if (clicked === "arrow2") {
      this.smoothScroll(this.top);
    }
    if (clicked === "resultados") {
      this.smoothScroll(this.resultados);
    }
    if (clicked === "blog") {
      this.smoothScroll(this.blog);
    }
    if (clicked === "login") {
      console.log(this.props.match.path);
    }
  }

  onScroll() {
    const isTop =
      this.layout.current.scrollTop === null ||
        this.layout.current.scrollTop <= 0
        ? false
        : true;
    this.setState({
      sticky: isTop
    });
  }

  // onScroll() {
  //   if(this.layout.current.scrollTop === null || this.layout.current.scrollTop <= 0) {
  //     this.setState({
  //       sticky: false
  //     })
  //   } else {
  //     this.setState({
  //       sticky: true
  //     })
  //   }
  // }

  render() {
    return (
      <div
        id="layout"
        className="layout"
        ref={this.layout}
        onScroll={this.onScroll}
      >
        <div className="layout-top" width="100%" height="100%">
          <div className="layout-top" ref={this.top} width="100%" />

          <Banner
            handleClick={this.handleClick}
            sobre={this.sobre}
            sticky={this.state.sticky}
            clicked={this.state.clicked}
          />
          <About sobre={this.sobre} api={this.api} />

          <div className="layout-content">
            <div className="layout-content-left">
              <Blog blog={this.blog} api={this.api} />
              <Resultados
                resultados={this.resultados}
                handleClick={this.handleClick}
                api={this.api}
              />
              <Midia midia={this.midia} api={this.api} />
            </div>
            <div className="layout-content-right">
              <Lateral api={this.api} artigos={this.artigos} fotos={this.fotos} />
            </div>
          </div>
          <Footer
            top={this.top}
            handleClick={this.handleClick}
            login={this.login}
          />
        </div>
      </div>
    );
  }
}
export default Layout;
