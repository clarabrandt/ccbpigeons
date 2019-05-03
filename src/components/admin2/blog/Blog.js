import React, { Component } from "react";
import "./Blog.css";

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
    console.log("dados chegando");
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
        <div className="postData-title">Novo post para o blog</div>
        <input
          className="text-area"
          type="text"
          id="titulo"
          name="titulo"
          placeholder="Título"
          value={editTitle}
          onChange={this.handleChange}
        />
        <input
          className="date-area"
          type="text"
          id="date"
          name="date"
          placeholder="dd/mm/yyyy"
          value={editDate}
          onChange={this.handleChange}
        />
        <textarea
          className="text-area"
          type="text"
          id="conteudo"
          name="conteudo"
          placeholder="texto"
          value={editConteudo}
          onChange={this.handleChange}
        />
        <div className="admin-post--buttons">
          <button
            className="admin-post--button cancel"
            type="button"
            onClick={this.closeForm}
          >
            Cancelar
          </button>
          <button
            className="admin-post--button post"
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
      <div className="admin-layout--content1">
        {Object.keys(items).map(key => {
          return (
            <div key={key} className="admin-layout--item">
              <div className="admin-layout--item--title">
                {items[key].titulo}
              </div>
              <div className="admin-layout--item--edit">
                <button
                  type="button"
                  className="admin-layout--edit--button"
                  onClick={e => this.editConteudo(e, key)}
                >
                  Edit
                </button>
              </div>
              <div className="admin-layout--item--delete">
                <button
                  type="button"
                  className="admin-layout--delete--button"
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
      <div>
        {!this.state.opcao && this.renderList()}
        {(this.state.opcao === "adicionar" || this.state.opcao === "editar") &&
          this.renderForm()}
        <div className={`admin-buttons ${this.state.opcao && "display"}`}>
          <button className="admin-button" onClick={this.addPost}>
            Adicionar post
          </button>
        </div>
      </div>
    );
  }
}
