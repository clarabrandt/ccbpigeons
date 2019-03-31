import React, { Component, Fragment } from 'react';
import './Admin.css';
import api from '../../utils/api.js';
import AdminAbout from './AdminAbout'
import AdminBlog from './AdminBlog'
import AdminResultados from './AdminResultados'
import AdminMidia from './AdminMidia'

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: 'admin',
      visible: true,
    };
    this.blog = React.createRef();
    this.goToComponent = this.goToComponent.bind(this);
    // this.toggleAdminItems = this.toggleAdminItems.bind(this);

    this.api = new api();
  }

  goToComponent(e) {
    this.setState({
      clicked: e.target.className,
      visible: false,
    })
  }

  goBack(e) {
    this.setState({
      visible: true,
    })
  }

  render() {
    return (
      <Fragment>
     { /**
       * NAVBAR
       */}
      <nav class="navbar has-shadow">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item brand-text" href="/admin">CCBPigeons</a>
            <div className="navbar-burger burger" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item has-dropdown is-hoverable">
                  <a class="navbar-link" href="/admin">Account</a>

                  <div class="navbar-dropdown">
                    <a class="navbar-item" href="/admin">Dashboard</a>
                    <a class="navbar-item" href="/admin">Profile</a>
                    <a class="navbar-item" href="/admin">Settings</a>
                    <hr class="navbar-divider"/>
                    <div class="navbar-item" href="/admin">Logout</div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </nav>

      {/**
       * END OF NAVBAR
       */

      /**
       * MAIN CONTAINER
       */}

      <div className="columns" id="admin">
        <aside className="column is-2 aside hero is-fullheight">
          a
        </aside>
        <div class="column is-4 messages hero is-fullheight" id="message-feed">
          b
        </div>
        <div class="column is-6 message hero is-fullheight is-hidden" id="message-pane">
          c
        </div>
        <footer class="footer">
        </footer>
      </div>

      {/**
       * <div className='admin'>
        <div>
        <div>Essa área é de uso exclusivo do Dr. Octávio Ribeiro Jr., para edição do CCb Pigeons.</div>
        <div>Por favor, clique na área que deseja modificar.</div>
        </div>
        <div className= {`admin-items ${this.state.visible? 'visible' : 'invisible' }`} >
          <div className='sobrelink' onClick={this.goToComponent}>
            Sobre
          </div>
          <div className='bloglink' onClick={this.goToComponent}>
            Blog
          </div>
          <div className='resultadoslink' onClick={this.goToComponent}>
            Resultados
          </div>
          <div className='midialink' onClick={this.goToComponent}>
            Midia
          </div>
        </div>

        <div className='admin-forms'>
          <div className='admin-content'>
            {
              this.state.clicked === 'sobrelink' &&
                <AdminAbout goBack={ this.goBack }/>
            }

            {
              this.state.clicked === 'bloglink' &&
                <AdminBlog goBack={ this.goBack }/>
            }
            {
              this.state.clicked === 'resultadoslink' &&
                <AdminResultados goBack={ this.goBack }/>
            }

            {
              this.state.clicked === 'midialink' &&
                <AdminMidia goBack={ this.goBack }/>
            }
            </div>
          </div>
      </div>
       */}
      </Fragment>
    )
  }
}
