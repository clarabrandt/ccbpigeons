import React from "react";
import "./Menu.css";

export class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <div className="menu-content">
          <div id="sobre" className="item">
            <div className="icon">
              <i className="fa fa-inbox" />
            </div>
            <div className="name">Sobre</div>
          </div>
          <div id="blog" className="item">
            <div className="icon">
              <i className="fa fa-star" />
            </div>
            <div className="name">Blog</div>
          </div>
          <div id="resultados" className="item">
            <div className="icon">
              <i className="fa fa-envelope-o" />
            </div>
            <div className="name">Resultados</div>
          </div>
          <div id="midia" className="item">
            <div className="icon">
              <i className="fa fa-folder-o" />
            </div>
            <div className="name">Midia</div>
          </div>
        </div>
      </div>
    );
  }
}
