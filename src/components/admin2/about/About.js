import React, { Component } from "react";
import "./About.css";

export default class About extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);
    this.state = {
      sobre: "",
      items: {},
      opcao: null,
      clicado: null,
      resposta: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addAbout = this.addAbout.bind(this);
    this.changeData = this.changeData.bind(this);
    this.editConteudo = this.editConteudo.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  componentDidMount() {
    this.fetchData()
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: data.sobre
        });
      });
  }

  fetchData() {
    const endpoint = `${this.baseUrl}sobre`;
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
    const sobre = this.state.sobre;
    const endpoint = `${this.baseUrl}sobre`;
    fetch(endpoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ key, sobre })
    })
      .then(response => response.json())
      .then(data => {
        const result = this.state.items;
        console.log(result[data.key]);
        this.setState({
          sobre
        });
      });
  }

  deleteData(e, key) {
    e.preventDefault();
    const endpoint = `${this.baseUrl}sobre`;
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

  handleClick(e) {
    const endpoint = `${this.baseUrl}sobre`;
    e.preventDefault();
    const data = { sobre: this.state.sobre };
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

  addAbout() {
    this.setState({
      opcao: "adicionar"
    });
  }

  editConteudo(e, key) {
    e.preventDefault();
    const { items } = this.state;
    this.setState({
      opcao: "editar",
      clicado: key,
      sobre: items[key].sobre
    });
  }

  closeForm(e) {
    e.preventDefault();
    this.setState({
      opcao: null
    });
  }

  renderForm() {
    const editConteudo = this.state.sobre;
    const { clicado } = this.state;

    return (
      <form className="postData">
        <div className="postData-title"> Texto sobre o CCB Pigeons</div>
        <textarea
          className="text-area"
          type="text"
          id="sobre"
          name="sobre"
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
                {items[key].sobre}
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
          <button className="admin-button" onClick={this.addAbout}>
            Adicionar conteúdo
          </button>
        </div>
      </div>
      // </div>
    );
  }
}
