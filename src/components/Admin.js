import React, { Component } from 'react';
import './Admin.css';
import AdminAbout from './AdminAbout'
import AdminBlog from './AdminBlog'
import AdminResultados from './AdminResultados'
import AdminMidia from './AdminMidia'

export default class Admin extends Component {
  render() {
    return (
      <div className='admin'>
        < AdminAbout />
        < AdminBlog />
        < AdminResultados />
        < AdminMidia />
      </div>
    )
  }
}
