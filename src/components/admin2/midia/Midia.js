import React, { Component } from "react";
import "./Midia.css";

export default class Midia extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);
    this.state = {
      titulo: "",
      conteudo: "",
      items: {},
      opcao: null,
      clicado: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addMidia = this.addMidia.bind(this);
    this.changeData = this.changeData.bind(this);
    this.editMidia = this.editMidia.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  componentDidMount() {
    this.fetchData()
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: data.midia
        });
      });
  }

  fetchData() {
    const endpoint = `${this.baseUrl}midia`;
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
    const conteudo = this.state.conteudo;
    console.log(key);
    const endpoint = `${this.baseUrl}midia`;
    fetch(endpoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ key, titulo, conteudo })
    })
      .then(response => response.json())
      .then(data => {
        const result = this.state.items;
        console.log(result[data.key]);
        this.setState({
          titulo,
          conteudo
        });
      });
  }

  deleteData(e, key) {
    e.preventDefault();
    const endpoint = `${this.baseUrl}midia`;
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
  }

  handleClick(event) {
    const endpoint = `${this.baseUrl}midia`;
    event.preventDefault();
    const data = { titulo: this.state.titulo, conteudo: this.state.conteudo };
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

  addMidia() {
    this.setState({
      opcao: "adicionar"
    });
  }

  editMidia(e, key) {
    e.preventDefault();
    const { items } = this.state;
    this.setState({
      opcao: "editar",
      clicado: key,
      titulo: items[key].titulo,
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
    const editConteudo = this.state.conteudo;
    const { clicado } = this.state;

    return (
      <form className="postData">
        <div className="postData-title"> Nova notícia</div>
        <input
          className="text-area"
          type="text"
          id="titulo"
          name="titulo"
          placeholder="título"
          value={editTitle}
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
                {items[key].midia}
              </div>
              <div className="admin-layout--item--edit">
                <button
                  type="button"
                  className="admin-layout--edit--button"
                  onClick={e => this.editMidia(e, key)}
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
          <button className="admin-button" onClick={this.addMidia}>
            Adicionar conteúdo
          </button>
        </div>
      </div>
    );
  }
}
