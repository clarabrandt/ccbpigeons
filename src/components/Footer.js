import React, { Component } from 'react';
import './Footer.css'

class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <div className='contato'>
          <div>Contato </div>
          <div className='address'>Condomínio São João Batista </div>
          <div className='address'>Entre Rios de Minas - MG - Brazil </div>
          <div className='address'>Tel: +55(31) 9 9772-2107 </div>
        </div>
        <div className='property'>
          <div className='arrow-top' anchor='arrow2' onClick={() => this.props.handleClick('arrow2')}>
            <div className='arrow2'></div>
            <div className='arrow-top--text'>back to top</div>
          </div>
          <div className= 'property--rights'>
            © 2019 CCB Pigeons
          </div>
        </div>
    </div>
    )
  }
}

export default Footer;
