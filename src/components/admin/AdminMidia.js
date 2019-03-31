import React, { Component, Fragment } from 'react';
import './AdminMidia.css'


export default class AdminMidia extends Component {

  baseUrl = 'https://us-central1-pigeon-90548.cloudfunctions.net/api/';

  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      conteudo: '',
      items: {},
      opcao: null,
      clicado: null,
      resposta: null,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addMidia = this.addMidia.bind(this)
    this.changeData = this.changeData.bind(this)
    this.editMidia = this.editMidia.bind(this)
    this.closeForm = this.closeForm.bind(this)
  }

  componentDidMount(){
    this.fetchData()
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: data.midia
        })
      })
  }

  fetchData() {
    const endpoint = `${this.baseUrl}midia`;
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
    const titulo = this.state.titulo
    const conteudo = this.state.conteudo
    console.log(key)
    const endpoint = `${this.baseUrl}midia`;
    fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({key, titulo, conteudo}),
    })
      .then(response => response.json())
      .then(data => {
        const result = this.state.items;
        console.log(result[data.key])
        this.setState({
          titulo,
          conteudo
        });
    }) 
  }

  deleteData(e, key) {
    e.preventDefault()
    const endpoint = `${this.baseUrl}midia`;
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

  handleClick(event) {
    const endpoint = `${this.baseUrl}midia`;
    event.preventDefault();
    const data = { titulo: this.state.titulo, conteudo: this.state.conteudo };
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

  addMidia() {
    this.setState({
      opcao: 'adicionar'
    })
  }

  editMidia(e, key) {
    e.preventDefault()
    const { items } = this.state
    this.setState({
      opcao: 'editar',
      clicado: key,
      titulo: items[key].titulo,
      conteudo: items[key].conteudo,
    })
  }

  closeForm(e) {
    e.preventDefault()
    this.setState({
      opcao: null
    })
  }

  renderForm() {
    const editTitle = this.state.titulo;
    const editConteudo = this.state.conteudo;
    const { clicado } = this.state;
    
    return (
      <form className='postData'>
        <div>Nova notícia</div>
        <input type='text' id='titulo' name='titulo' placeholder='título' value={editTitle} onChange={ this.handleChange } />
        <textarea type='text' id='conteudo' name='conteudo' placeholder='texto' value={editConteudo} onChange={ this.handleChange }/>
        <div className='buttons'>
          <button type ='button' onClick={ this.closeForm }>Cancelar</button>
          <button type ='button' onClick={ (e) => this.state.opcao === 'adicionar' ? this.handleClick(e) : this.changeData(e, clicado)}>Postar</button>
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
              <div className='admin-panel--item--title'>{items[key].titulo}</div>
              <div className='admin-panel--item--edit' >
                <button type ='button' className='edit-button' onClick={ (e) => this.editMidia(e, key) }>Edit</button>
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
      <div className= 'admin-panel'>
        <div className='admin-panel--title'>Midia</div>
        
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
            <button onClick={ this.addMidia }>Nova notícia</button>
          </div>
        </div>
      </div>
      
    )
  }
}

