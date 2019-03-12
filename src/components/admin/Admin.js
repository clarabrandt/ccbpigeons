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
        <div className='menu'>
          < AdminAbout />
          <div className='bloglink' onClick={this.goToComponent}> 
            Blog
          </div>
          < AdminResultados />
          < AdminMidia />
        <div className= 'content'>
          {
            this.state.clicked === 'bloglink' &&
              <AdminBlog />
          }
        </div>
        </div>
      </div>

    )
  }
}
