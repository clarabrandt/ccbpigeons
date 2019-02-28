import React, { Component } from 'react';
import './Blog.css'

export default class Blog extends Component {
  render() {
    return (
      <div className='blog' ref={this.props.blog}>
        <div className='blog-title'>Blog</div>
        <div className='posts'>
          <div className='post-list'>
            <div className='post-subtitle'>Mais populares</div>
            <div className='post-other'>New Castle e a vacina La Sota.</div>
            <div className='post-keep-reading'>continuar lendo --></div>
            <div className='post-other'>Pombos urbanos: biologia, problemas, manejo e controle.</div>
            <div className='post-keep-reading'>continuar lendo --></div>
            <div className='post-other'>A columbofilia em Conselheiro Lafaiete.</div>
            <div className='post-keep-reading'>continuar lendo --></div>
          </div>
          <div className='post-new'>
            <div className='post-subtitle--new'>Mais recentes</div>
            <div className='post-title'>A columbofilia em Conselheiro Lafaiete</div>
            <div className='post-date'>25/02/2019</div>
            <div className='post-content'>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                deserunt mollit anim id est laborum.
              </p>
              <div className='post-new--keep-reading'>continuar lendo --></div>
            </div>
            <div className='post-title'>Como vacinar seus pombos</div>
            <div className='post-date'>15/02/2019</div>
            <div className='post-content'>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                deserunt mollit anim id est laborum.
              </p>
              <div className='post-new--keep-reading'>continuar lendo --></div>
            </div>
           </div> 
          <div className='post-arquivo'>
            <div className='post-subtitle--arquivo'> Arquivo</div>
            <div className='post-arquivo--date'>2019</div>
            <div className='post-arquivo--date'>2018</div>
            <div className='post-arquivo--date'>2017</div>
            <div className='post-arquivo--date'>2016</div>
          </div>
        </div>
        </div>
        
     
    )
  }
}