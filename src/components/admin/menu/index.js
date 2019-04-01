import React from 'react';
import './index.css'

export class Menu extends React.Component {
  render() {
    return (
      <aside className="column is-2 aside hero is-fullheight">
        <div>
          <div className="main">
            <div id="sobre" className="item active" onClick={this.props.goToComponent}>
              <span className="icon"><i className="fa fa-inbox" /></span>
              <span className="name">Sobre</span>
            </div>
            <div id="blog" className="item" onClick={this.props.goToComponent}>
              <span className="icon"><i className="fa fa-star" /></span>
              <span className="name">Blog</span>
            </div>
            <div id="resultados" className="item" onClick={this.props.goToComponent}>
              <span className="icon"><i className="fa fa-envelope-o" /></span>
              <span className="name">Resultados</span>
            </div>
            <div id="midia" className="item" onClick={this.props.goToComponent}>
              <span className="icon"><i className="fa fa-folder-o" /></span>
              <span className="name">Midia</span>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}
