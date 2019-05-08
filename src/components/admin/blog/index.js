import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import withRoot from "../../../withRoot";
import { withFirebase } from "../../firebase";
import { withStyles } from '@material-ui/core/styles';
import { compose } from "recompose";
import PanelComponent from '../panel';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import "./style.css";

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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class Blog extends Component {
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

    this.storageRef = props.firebase.storage.ref();
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
    return fetch(endpoint,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
  }

  changeData(e, key) {
    e.preventDefault();
    const { titulo } = this.state;
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

  // handleChange(event) {
  //   console.log(event.target.name)
  //   console.log(event.target.value)
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleClick(e, key) {
    const endpoint = `${this.baseUrl}blog`;
    console.log(key)
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
    const { classes } = this.props;
    const { titulo } = this.state;
    const editDate = this.state.date;
    const editConteudo = this.state.conteudo;
    const { clicado } = this.state;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <div className='postData-container'>
          <div>Novo post para o blog</div>
          <TextField
            id="standard-name"
            label="Título"
            className={classes.textField}
            value={titulo}
            onChange={this.handleChange('titulo')}
            margin="normal"
          />
          <TextField
            id="standard-name"
            placeholder="dd/mm/yyyy"
            className={classes.textField}
            value={editDate}
            onChange={this.handleChange('date')}
            margin="normal"
          />

          <TextField
            id="standard-name"
            label="Conteudo"
            placeholder="texto"
            value={editConteudo}
            onChange={this.handleChange('conteudo')}
          />
          <div className="buttons">
            <Button type="button" onClick={this.closeForm}>
              Cancelar
          </Button>
            <Button
              type="button"
              onClick={e =>
                this.state.opcao === "adicionar"
                  ? this.handleClick(e)
                  : this.changeData(e, clicado)
              }
            >
              Postar
          </Button>
          </div>
        </div>
      </form>
    );
  }

  // renderList() {
  //   const { items } = this.state;
  //   return (
  //     <div className="admin-panel--list">
  //       {Object.keys(items).map(key => {
  //         return (
  //           <div key={key} className="admin-panel--item">
  //             <div className="admin-panel--item--title">
  //               {items[key].titulo}
  //             </div>
  //             <div className="admin-panel--item--edit">
  //               <button
  //                 type="button"
  //                 className="edit-button"
  //                 onClick={e => this.editPost(e, key)}
  //               >
  //                 Edit
  //               </button>
  //             </div>
  //             <div className="admin-panel--item--delete">
  //               <button
  //                 type="button"
  //                 className="delete-button"
  //                 onClick={e => this.deleteData(e, key)}
  //               >
  //                 Delete
  //               </button>
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // }
  // componentWillMount() {
  //   this.setState({
  //     items: this.props.files
  //   })
  // }
  renderList() {
    const { classes } = this.props;
    const { items } = this.state;
    return (
      <PanelComponent title="Blog">
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
  render() {
    return (
      // <div className= 'admin-panel'>
      // <div className='admin-panel--title'>Blog</div>

      <List className="admin-panel--content">
        {!this.state.opcao && this.renderList()}
        {(this.state.opcao === "adicionar" || this.state.opcao === "editar") &&
          this.renderForm()}

        <Button className="button" onClick={this.addPost}>
          Novo post
          </Button>

      </List>
    );
  }
}

const BlogComponent = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(Blog)));

// export default Blog;
export default Blog;

export { BlogComponent };
