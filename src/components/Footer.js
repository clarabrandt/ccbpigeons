import React from 'react';
import Login from './Login'
import './Footer.css'

const Footer =() => (
  <div className='footer'>
    <div className='contato'>
      <div>Contato </div>
      <div className='address'>Condomínio São João Batista </div>
      <div className='address'>Entre Rios de Minas - MG - Brazil </div>
      <div className='address'>Tel: +55(31) 9 9772-2107 </div>
    </div>
    <div className='property'>
      <div className='Login' onClick={ () => this.props.handleClick('login') } > 
          Adm login
      </div>
      <div className= 'property--rights'>
      © 2019 CCB Pigeons
    </div>
    </div>
  </div>

) 


export default Footer; 