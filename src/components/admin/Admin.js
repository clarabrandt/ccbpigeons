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
        <div>
        <div>Essa área é de uso exclusivo do Dr. Octávio Ribeiro Jr, para edição do CCb Pigeons.</div>
        <div>Por favor, clique na área que deseja modificar.</div>
        </div>
        <div className= {`admin-items ${this.state.visible? 'invisible' : 'visible' }`} onClick={ this.toggleAdminItems } >
          <div className='sobrelink' onClick={this.goToComponent}> 
            <div className='sobrelink-title'>Sobre</div>
            <div className='sobrelink-item sobre-edit'>Editar Conteúdo</div>
            <div className='sobrelink-item sobre-delete'>Deletar Conteúdo</div>
          </div>
          <div className='bloglink' > 
            <div className='bloglink-title'>Blog</div>
            <div className='bloglink-item blog-add' onClick={this.goToComponent}>Adicionar Post</div>
            <div className='bloglink-item blog-edit'>Editar Post</div>
            <div className='bloglink-item blog-delete'>Deletar Post</div>
          </div>
          <div className='resultadoslink' onClick={this.goToComponent}> 
            <div className='resultadoslink-title'>Resultados</div>
            <div className='resultadoslink-item resultados-add'>Adicionar Resultado</div>
            <div className='resultadoslink-item resultados-edit'>Editar Resultado</div>
            <div className='resultadoslink-item resultados-delete'>Deletar Resultado</div>
          </div>
          <div className='midialink' onClick={this.goToComponent}> 
            <div className='midialink-title'>Midia</div>
            <div className='midialink-item midia-add'>Adicionar Notícia</div>
            <div className='midialink-item midia-edit'>Editar Notícia</div>
            <div className='midialink-item midia-delete'>Deletar Notícia</div>
          </div>
        </div>

        <div className='admin-forms'>
          <div className='admin-content'>
            {
              this.state.clicked === 'sobrelink' &&
                <AdminAbout />
            }
          
            {
              this.state.clicked === 'bloglink-item blog-add' &&
              <AdminBlog />
            }
            {
              this.state.clicked === 'resultadoslink' &&
                <AdminResultados />
            }
          
            {
              this.state.clicked === 'midialink-item midia-add' &&
                <AdminMidia />
            }
            </div>
          
        
          </div>
      </div>
     

    )
  }
}
