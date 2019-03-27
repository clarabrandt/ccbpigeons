import React, { Component } from 'react';
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
    this.goBack = this.goBack.bind(this);
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
      <div className='admin'>
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
    )
  }
}
