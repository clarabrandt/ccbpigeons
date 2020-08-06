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
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import {
  DatePicker,
} from '@material-ui/pickers';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./style.css";

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%',
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
  paper: {
    padding: theme.spacing.unit * 3,
    margin: theme.spacing.unit * 3,
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
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
      date: new Date(),
      items: {},
      opcao: null,
      clicado: null,
      resposta: null,
      show: true,
      conteudo: EditorState.createEmpty(),
    };

    this.storageRef = props.firebase.storage.ref();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.addPost = this.addPost.bind(this);
    this.changeData = this.changeData.bind(this);
    this.editPost = this.editPost.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.getBlogPosts = this.getBlogPosts.bind(this);
  }

  componentDidMount() {
    console.log('this.state.conteudo');
    console.log(this.state.conteudo);
    this.getBlogPosts();
  }

  getBlogPosts() {
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
    const titulo = this.state.titulo;
    const date = this.state.date;
    const conteudo = convertToRaw(this.state.conteudo.getCurrentContent());
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
      .then(
        console.log(),
        this.setState({
          opcao: null,
          show: true,
        }, this.getBlogPosts)
      )
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

  onEditorStateChange = (editorState) => {
    this.setState({
      conteudo: editorState,
    });
  };

  handleDateChange = (date) => {
    this.setState({ date: date });
  };

  handleChange = name => event => {
    console.log('handlechange');
    console.log('name');
    console.log(name);
    console.log('event');
    console.log(event);
    this.setState({
      [name]: event.target.value
    });
  };

  handleClick(e, key) {
    const endpoint = `${this.baseUrl}blog`;
    e.preventDefault();
    const data = {
      titulo: this.state.titulo,
      date: this.state.date,
      conteudo: convertToRaw(this.state.conteudo.getCurrentContent())
    };
    fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(
        this.setState({
          opcao: null,
          show: true,
        }, this.getBlogPosts)
      )
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
      conteudo: EditorState.createWithContent(convertFromRaw(items[key].conteudo))
    });
  }

  closeForm(e) {
    e.preventDefault();
    this.setState({
      opcao: null,
      show: true
    });
  }
  componentWillMount() {
    this.setState({
      items: this.state.items
    })
  }
  renderForm() {
    if (this.state.show === true) {
      this.setState({
        show: false
      })
    }
    const { classes } = this.props;
    const { clicado, date, titulo } = this.state;

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
          <DatePicker
            value={date}
            onChange={this.handleDateChange}

          />
          <Editor
            editorState={this.state.conteudo}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
            onEditorStateChange={this.onEditorStateChange}
          />
          <div className="buttons">
            <Button type="button" onClick={this.closeForm}>
              <div className="button-post"> Cancelar</div>
            </Button>
            <Button
              type="button"
              color="secondary"
              onClick={e =>
                this.state.opcao === "adicionar"
                  ? this.handleClick(e)
                  : this.changeData(e, clicado)
              }
            >
              <div className="button-post">Postar</div>
            </Button>
          </div>
        </div>
      </form>
    );
  }

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
                  <div key={item} className='listItem'>
                    <ListItem key={item} id={item} value={item}>
                      <ListItemText className='listItem-text'>
                        <div className='listItem-text--text'>
                          {items[item].titulo}
                        </div>
                      </ListItemText>
                      <div className='listItem-buttons'>
                        <div className='listItem-button'>
                          <IconButton key={item} aria-label="Delete" onClick={e => this.deleteData(e, item)}>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                        <ListItemSecondaryAction className='listItem-icon'>
                          <div className='listItem-button'>
                            <IconButton key={item} aria-label="Edit" onClick={e => this.editPost(e, item)}>
                              <EditIcon />
                            </IconButton>
                          </div>
                        </ListItemSecondaryAction>
                      </div>
                    </ListItem>
                  </div>
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
      <List className="admin-panel--content">
        {!this.state.opcao && this.renderList()}
        {(this.state.opcao === "adicionar" || this.state.opcao === "editar") &&
          this.renderForm()}
        <div className="button-post" >
          <Button onClick={this.addPost}>
            <div className={`button-post--text ${this.state.show ? 'show' : 'noshow'}`}>Novo post</div>
          </Button>
        </div>

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
