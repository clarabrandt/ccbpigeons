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
      visible: false,
    };
    this.blog = React.createRef();
    this.goToComponent = this.goToComponent.bind(this);
    this.toggleAdminItems = this.toggleAdminItems.bind(this);

    this.api = new api();
  }

  goToComponent(e) {
    this.setState({
      clicked: e.target.className,
      visible: false
    })
  }

  toggleAdminItems() {
    if(this.state.visible === true) {
      this.setState({
        visible: false
      })
    } else {
      this.setState({
        visible: true
      })
    }
  }

  render() {
    return (
      <div className='admin'>
        <div className= {`admin-items ${this.state.visible? 'invisible' : 'visible' }`} onClick={ this.toggleAdminItems } >
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
                <AdminAbout />
            }
          
            {
              this.state.clicked === 'bloglink' &&
              <AdminBlog />
            }
            {
              this.state.clicked === 'resultadoslink' &&
                <AdminResultados />
            }
          
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
