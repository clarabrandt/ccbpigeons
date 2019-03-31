import React, { Component, Fragment } from 'react';
import './Admin.css';
import api from '../../utils/api.js';
import AdminAbout from './AdminAbout'
import AdminBlog from './AdminBlog'
import AdminResultados from './AdminResultados'
import AdminMidia from './AdminMidia'
import { Navbar } from './navbar';
import { Menu } from './menu';



export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 'admin',
    };
    this.goToComponent = this.goToComponent.bind(this);
    this.api = new api();
  }

  goToComponent(e) {
    this.setState({
      clicked: e.target.id,
    })
  }

  render() {
    return (
      <Fragment>
    
        <Navbar/>
        <div className="columns" id="admin">
          <Menu goToComponent={this.goToComponent} />
          <div className="column is-4 messages hero is-fullheight" id="list">
            {
              this.state.clicked === 'sobre' &&
              <AdminAbout goBack={this.goBack} />
            }

            {
              this.state.clicked === 'blog' &&
              <AdminBlog goBack={this.goBack} />
            }
            {
              this.state.clicked === 'resultados' &&
              <AdminResultados goBack={this.goBack} />
            }

            {
              this.state.clicked === 'midia' &&
              <AdminMidia goBack={this.goBack} />
            }
        </div>
          <div className="column is-6 message hero is-fullheight is-hidden" id="detail">
            details
        </div>
          <footer className="footer">
          </footer>
        </div>
      </Fragment>
    )
  }
}
