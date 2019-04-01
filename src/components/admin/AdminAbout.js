import React, { Component, Fragment } from 'react';
import './AdminAbout.css'

export default class AdminAbout extends Component {

baseUrl = 'https://us-central1-pigeon-90548.cloudfunctions.net/api/';

constructor(props) {
  super(props);
  this.state = {
    sobre: '',
    items: {},
    opcao: null,
    clicado: null,
    resposta: null,
  }

  this.handleClick = this.handleClick.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.addAbout = this.addAbout.bind(this)
  this.changeData = this.changeData.bind(this)
  this.editConteudo = this.editConteudo.bind(this)
  this.closeForm = this.closeForm.bind(this)
}

  componentDidMount(){
    this.fetchData()
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: data.sobre
        })
      })   
  }

  fetchData() {
    const endpoint = `${this.baseUrl}sobre`;
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  }

  changeData(e, key) {
    e.preventDefault()
    const sobre = this.state.sobre
    const endpoint = `${this.baseUrl}sobre`;
    fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({key, sobre}),
    })
      .then(response => response.json())
      .then(data => {
        const result = this.state.items;
        console.log(result[data.key])
        this.setState({
          sobre,
        });
    }) 
  }

  deleteData(e, key) {
    e.preventDefault()
    const endpoint = `${this.baseUrl}sobre`;
    fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({key}),
    })
        .then(response => response.json())
        .then(data => {
          const result = this.state.items;
          delete result[data.key];
          this.setState({
            items: result,
          });
        }) 
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleClick(e) {
    const endpoint = `${this.baseUrl}sobre`;
    e.preventDefault();
    const data = { sobre: this.state.sobre };
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    this.setState({
      opcao: null,
    })
  }

  addAbout() {
    this.setState({
      opcao: 'adicionar'
    })
  }

  editConteudo(e, key) {
    e.preventDefault()
    const { items } = this.state
    this.setState({
      opcao: 'editar',
      clicado: key,
      sobre: items[key].sobre,
    })
  }

  closeForm(e) {
    e.preventDefault()
    this.setState({
      opcao: null
    })
  }

  renderForm() {
    const editConteudo = this.state.sobre;
    const { clicado } = this.state;
    
    return (
      <form className='postData'>
        <div>Nova informação sobre o CCB Pigeons</div>
        <textarea type='text' id='sobre' name='sobre' placeholder='texto' value={editConteudo} onChange={ this.handleChange }/>
        <div className='buttons'>
          <button type ='button' onClick={ this.closeForm }>Cancelar</button>
          <button type ='button' onClick={ (e) => this.state.opcao === 'adicionar' ? this.handleClick(e) : this.changeData(e, clicado) }>Postar</button>
        </div>
      </form>
    )
  }

  renderList(){
    const { items } = this.state;
    return(
      <div className= 'admin-panel--list'>
        { 
          Object.keys(items).map((key) => {
            return (
            <div key={ key } className='admin-panel--item'>
              <div className='admin-panel--item--title'>{items[key].sobre}</div>
              <div className='admin-panel--item--edit' >
                <button type ='button' className='edit-button' onClick={ (e) => this.editConteudo(e, key) }>Edit</button>
              </div>
              <div className='admin-panel--item--delete'>
                <button type ='button' className='delete-button' onClick={ (e) => this.deleteData(e, key) }>Delete</button>
              </div>
            </div>
          )})
        }  
      </div>
    )
  }

  render() {
    return(
      // <div className= 'admin-panel'>
        // <div className='admin-panel--title'>Sobre</div>
        
        <div className='admin-panel--content'>
          {
            !this.state.opcao && 
              this.renderList()
          }
          {
            (this.state.opcao === 'adicionar' || this.state.opcao === 'editar') && 
              this.renderForm()
          }
          <div className='buttons'>
            <button onClick={ this.props.goBack }>Voltar</button>
            <button onClick={ this.addAbout }>Adicionar conteúdo</button>
          </div>
        </div>
      // </div>
      
    )
  }
}
