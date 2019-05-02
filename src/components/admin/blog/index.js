import React, { Component } from "react";
import "./style.css";

export default class Blog extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);
    this.state = {
      titulo: "",
      date: "",
      conteudo: "",
      items: {},
      opcao: null,
      clicado: null,
      resposta: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addPost = this.addPost.bind(this);
    this.changeData = this.changeData.bind(this);
    this.editPost = this.editPost.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  componentDidMount() {
    this.fetchData()
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: data.blog
        });
      });
  }

  fetchData() {
    const endpoint = `${this.baseUrl}blog`;
    return fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  changeData(e, key) {
    e.preventDefault();
    const titulo = this.state.titulo;
    const date = this.state.date;
    const conteudo = this.state.conteudo;
    const endpoint = `${this.baseUrl}blog`;
    fetch(endpoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ key, titulo, date, conteudo })
    })
      .then(response => response.json())
      .then(data => {
        const result = this.state.items;
        console.log(result[data.key]);
        this.setState({
          titulo,
          date,
          conteudo
        });
      });
  }

  deleteData(e, key) {
    e.preventDefault();
    const endpoint = `${this.baseUrl}blog`;
    fetch(endpoint, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ key })
    })
      .then(response => response.json())
      .then(data => {
        const result = this.state.items;
        delete result[data.key];
        this.setState({
          items: result
        });
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(event.target.value);
  }

  handleClick(e) {
    const endpoint = `${this.baseUrl}blog`;
    e.preventDefault();
    const data = {
      titulo: this.state.titulo,
      date: this.state.date,
      conteudo: this.state.conteudo
    };
    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    this.setState({
      opcao: null
    });
  }

  addPost() {
    this.setState({
      opcao: "adicionar"
    });
  }

  editPost(e, key) {
    e.preventDefault();
    const { items } = this.state;
    this.setState({
      opcao: "editar",
      clicado: key,
      titulo: items[key].titulo,
      date: items[key].date,
      conteudo: items[key].conteudo
    });
  }

  closeForm(e) {
    e.preventDefault();
    this.setState({
      opcao: null
    });
  }

  renderForm() {
    const editTitle = this.state.titulo;
    const editDate = this.state.date;
    const editConteudo = this.state.conteudo;
    const { clicado } = this.state;

    return (
      <form className="postData">
        <div>Novo post para o blog</div>
        <input
          type="text"
          id="titulo"
          name="titulo"
          placeholder="titulo"
          value={editTitle}
          onChange={this.handleChange}
        />
        <input
          type="text"
          id="date"
          name="date"
          placeholder="dd/mm/yyyy"
          value={editDate}
          onChange={this.handleChange}
        />
        <textarea
          type="text"
          id="conteudo"
          name="conteudo"
          placeholder="texto"
          value={editConteudo}
          onChange={this.handleChange}
        />
        <div className="buttons">
          <button type="button" onClick={this.closeForm}>
            Cancelar
          </button>
          <button
            type="button"
            onClick={e =>
              this.state.opcao === "adicionar"
                ? this.handleClick(e)
                : this.changeData(e, clicado)
            }
          >
            Postar
          </button>
        </div>
      </form>
    );
  }

  renderList() {
    const { items } = this.state;
    return (
      <div className="admin-panel--list">
        {Object.keys(items).map(key => {
          return (
            <div key={key} className="admin-panel--item">
              <div className="admin-panel--item--title">
                {items[key].titulo}
              </div>
              <div className="admin-panel--item--edit">
                <button
                  type="button"
                  className="edit-button"
                  onClick={e => this.editPost(e, key)}
                >
                  Edit
                </button>
              </div>
              <div className="admin-panel--item--delete">
                <button
                  type="button"
                  className="delete-button"
                  onClick={e => this.deleteData(e, key)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      // <div className= 'admin-panel'>
      // <div className='admin-panel--title'>Blog</div>

      <div className="admin-panel--content">
        {!this.state.opcao && this.renderList()}
        {(this.state.opcao === "adicionar" || this.state.opcao === "editar") &&
          this.renderForm()}
        <div className="buttons">
          <button className="button" onClick={this.props.goBack}>
            Voltar
          </button>
          <button className="button" onClick={this.addPost}>
            Novo post
          </button>
        </div>
      </div>
      // </div>
    );
  }
}
