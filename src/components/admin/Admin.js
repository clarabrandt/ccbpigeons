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
    };
    this.blog = React.createRef();
    this.goToComponent = this.goToComponent.bind(this);

    this.api = new api();
  }

  goToComponent(e) {
    
    this.setState({
      clicked: e.target.className,
    });
  }

  render() {
    return (
      <div className='admin'>
        <div className='admin-content'>

          <div className='sobrelink' onClick={this.goToComponent}> 
            Sobre
          </div>
          <div className='admin-sobre--content'>
            {
              this.state.clicked === 'sobrelink' &&
                <AdminAbout />
            }
          </div>
          
          <div className='bloglink' onClick={this.goToComponent}> 
            Blog
          </div>
          <div className='admin-blog--content'>
            {
              this.state.clicked === 'bloglink' &&
                <AdminBlog />
            }
          </div>

          <div className='resultadoslink' onClick={this.goToComponent}> 
            Resultados
          </div>
          <div className='admin-resultados--content'>
            {
              this.state.clicked === 'resultadoslink' &&
                <AdminResultados />
            }
          </div>

          <div className='midialink' onClick={this.goToComponent}> 
            Midia
          </div>
          <div className='admin-midia--content'>
          {
            this.state.clicked === 'midialink' &&
              <AdminMidia />
          }
          </div>
        </div>
      </div>

    )
  }
}
