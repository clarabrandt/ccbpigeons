import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "login",
      redirect: false
    };
  }

  render() {
    return (
      <div className="foot">
        <div className="contato">
          <div className="footer-title"> Contato </div>{" "}
          <div className="address"> Condomínio São João Batista </div>{" "}
          <div className="address"> Entre Rios de Minas - MG - Brazil </div>{" "}
          <div className="address"> Tel: +55(31) 9 9772 - 2107 </div>{" "}
          <div className="address"> octavioribeirojr @gmail.com </div>{" "}
        </div>{" "}
        <div className="property">
          <div
            className="arrow-top"
            anchor="arrow2"
            onClick={() => this.props.handleClick("arrow2")}
          >
            <div className="arrow-top--draw"> </div>{" "}
            <div className="arrow-top--text"> Volta para o início </div>{" "}
          </div>{" "}
          <div className="property--rights"> ©2019 CCB Pigeons </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Footer;
