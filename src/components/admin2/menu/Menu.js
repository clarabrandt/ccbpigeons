import React from "react";
import "./Menu.css";

export class Menu extends React.Component {
  render() {
    return (
      <div className="menu-list">
        <div className="menu-list-content">
          <div className="item">
            <div className="icon">
              <i className="fa fa-inbox" />
            </div>
            <div
              id="sobre"
              className="item-name"
              onClick={this.props.goToComponent}
            >
              Sobre
            </div>
          </div>
          <div className="item">
            <div className="icon">
              <i className="fa fa-star" />
            </div>
            <div
              id="blog"
              className="item-name"
              onClick={this.props.goToComponent}
            >
              Blog
            </div>
          </div>
          <div className="item">
            <div className="icon">
              <i className="fa fa-envelope-o" />
            </div>
            <div
              id="resultados"
              className="item-name"
              onClick={this.props.goToComponent}
            >
              Resultados
            </div>
          </div>
          <div className="item">
            <div className="icon">
              <i className="fa fa-folder-o" />
            </div>
            <div
              id="midia"
              className="item-name"
              onClick={this.props.goToComponent}
            >
              Midia
            </div>
          </div>
        </div>
      </div>
    );
  }
}
