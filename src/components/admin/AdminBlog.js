import React, { Component, Fragment } from 'react';
import './AdminBlog.css'

export default class AdminBlog extends Component {

  baseUrl = 'https://us-central1-pigeon-90548.cloudfunctions.net/api/';

  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      conteudo: '',
      items: {},

    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.fetchData()
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: data.blog
        })
      })
  }

  fetchData() {
    const endpoint = `${this.baseUrl}blog`;
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  }

  deleteData(key) {
    const endpoint = `${this.baseUrl}blog`;
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
    const endpoint = `${this.baseUrl}blog`;
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
  }

  renderForm() {
    return (
      <Fragment>
        <form className='postData'>
          <div>Novo post para o blog</div>
          <input type='text' id='titulo' name='titulo' placeholder='título' onChange={ this.handleChange } />
          <textarea type='text' id='conteudo' name='conteudo' placeholder='texto' onChange={ this.handleChange }/>
          <div className='buttons'>
            <button onClick={ this.props.goBack }>Voltar</button>
            <button onClick={ this.handleClick }>Postar</button>
          </div>
        </form>
      </Fragment>

    )
  }

  renderList(){
    const { items } = this.state;
    return(
      <div className='admin-panel--list'>
        { 
          Object.keys(items).map((key) => {
            return (
            <div key={ key } className='admin-panel--item'>
              <div className='admin-panel--item--title'>{items[key].titulo}</div>
              <div className='admin-panel--item--edit'>Edit</div>
              <div className='admin-panel--item--delete'>
                <button className='delete-button' onClick={ () => this.deleteData(key) }>Delete</button>
              </div>
            </div>
          )})
        }  
      </div>
    )
  }

  render() {
    return(
      <div className='admin-panel'>
        <div className='admin-panel--title'>Blog</div>
        <div className='admin-panel--content'>
        {/* {
          this.renderForm()
        } */}
          {
            this.renderList()
          }
        </div>
      </div>
    )
  }
}
