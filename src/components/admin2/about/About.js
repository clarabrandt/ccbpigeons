import React, { Component } from "react";
import "./About.css";

export default class About extends Component {
  render() {
    return (
      <div>
        <div className="admin-buttons">
          <button className="admin-button">Voltar</button>
          <button className="admin-button">Novo conteúdo</button>
        </div>
      </div>
    );
  }
}
