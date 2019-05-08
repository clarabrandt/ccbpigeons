import React, { Component } from "react";
import "./style.css";
import { withRouter } from "react-router-dom";
import withRoot from "../../../withRoot";
import { withFirebase } from "../../firebase";
import { withStyles } from '@material-ui/core/styles';
import { compose } from "recompose";
import PanelComponent from '../panel';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  tableContainer: {
    height: '100%',
  },
  paper: {
    padding: theme.spacing.unit * 3,
    margin: theme.spacing.unit * 3,
  },
});

class Midia extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);
    this.state = {
      titulo: "",
      conteudo: "",
      items: {},
      opcao: null,
      clicado: null,
      selecionado: null,
      open: false,
      files: {},
      newSection: null,
      fetching: true,

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
        <div>Nova notícia</div>
        <input
          type="text"
          id="titulo"
          name="titulo"
          placeholder="título"
          value={editTitle}
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
    console.log(items)
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
                  onClick={e => this.editMidia(e, key)}
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
    const { classes } = this.props;
    const { items } = this.state;
    console.log(this.state.items)
    return (
      <PanelComponent title="Midia">
        <Paper className={classes.root}>
          <List className='admin-list'>
          {
            Object.keys(items).map(item => {
              return (
                <ListItem key={item} id={item} value={item} className='listItem'>
                  <ListItemText className='listItem-text'>{items[item].titulo}</ListItemText>
                  <IconButton key={item} aria-label="Delete" onClick={e => this.deleteData(e, item)}>
                    <DeleteIcon />
                  </IconButton>
                  <ListItemSecondaryAction className='listItem-icon'>
                    <IconButton key={item} aria-label="Edit" onClick={e => this.editConteudo(e, item)}>
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })
          }
          </List>
        </Paper>
      </PanelComponent>
    );
  }
}



const MidiaComponent = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(Midia)));

// export default Midia;
export default Midia;

export { MidiaComponent };

