import React, { Component } from "react";
import "./style.css";
import { withRouter } from "react-router-dom";
import withRoot from "../../../withRoot";
import { withFirebase } from "../../firebase";
import { withStyles } from '@material-ui/core/styles';
import { compose } from "recompose";
import PanelComponent from '../panel';
import Button from '@material-ui/core/Button';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'


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

class About extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);
    this.state = {
      sobre: "",
      items: {},
      opcao: null,
      clicado: null,
      resposta: null,
      show: true
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addAbout = this.addAbout.bind(this);
    this.changeData = this.changeData.bind(this);
    this.editConteudo = this.editConteudo.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.getSobreUpdate = this.getSobreUpdate.bind(this);
  }

  componentDidMount() {
    this.getSobreUpdate();
  }

  getSobreUpdate() {
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
      .then(
        this.setState({
          opcao: null,
          show: true,
        }, this.getSobreUpdate)
      )
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

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

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
    })
      .then(
        this.setState({
          opcao: null,
          show: true,
        }, this.getSobreUpdate)
      )
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
    const editConteudo = this.state.sobre;
    const { clicado } = this.state;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <div className='postData-container'>
          <div>Nova informação sobre o CCB Pigeons</div>
          <TextField
            id="standard-multiline-flexible"
            label="Conteúdo"
            className={classes.textField}
            value={editConteudo}
            onChange={this.handleChange('sobre')}
            margin="normal"
            multiline
            rowsMax="6000"
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
    console.log(this.state.items)
    return (
      <PanelComponent title="Sobre">
        <Paper className={classes.root}>
          <List className='admin-list'>
            {
              Object.keys(items).map(item => {
                return (
                  <div key={item} className='listItem'>
                    <ListItem key={item} id={item} value={item}>
                      <ListItemText className='listItem-text'>
                        <div className='listItem-text--text'>
                          {items[item].sobre}
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
                            <IconButton key={item} aria-label="Edit" onClick={e => this.editConteudo(e, item)}>
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
          <Button onClick={this.addAbout}>
            <div className={`button-post--text ${this.state.show ? 'show' : 'noshow'}`}>Novo conteúdo</div>
          </Button>
        </div>
      </List>
    );
  }
}
const AboutComponent = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(About)));

// export default About;
export default About;

export { AboutComponent };

