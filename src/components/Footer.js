import React, { Component } from 'react';
import './Footer.css';
import { LoginPage } from './Login';
import { Redirect } from 'react-router-dom' 

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: 'login',
      redirect: false,
    };
    
  }
  
  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   })
  // }

  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to='/login' />
  //   }
  // }
 
  
  render() {
    return (   
      <div className='foot'>
        <div className='contato'>
          <div className='footer-title'>Contato </div>
          <div className='address'>Condomínio São João Batista </div>
          <div className='address'>Entre Rios de Minas - MG - Brazil </div>
          <div className='address'>Tel: +55(31) 9 9772-2107 </div>
        </div>
        <div className='property'>
          <div className='arrow-top' anchor='arrow2' onClick={() => this.props.handleClick('arrow2')}>
            <div className='arrow-top--draw'></div>
            <div className='arrow-top--text'>Volta para o início</div>
          </div>
          {/* {this.renderRedirect()}
          <div className= 'admin-login' anchor='login' onClick={this.setRedirect} ref={this.login}>
            <div className='footer-title'>Private</div>
          </div> */}
          <div className= 'property--rights'>
            © 2019 CCB Pigeons
          </div>
        </div>
    </div>
    
    )
  }
}

export default Footer;
