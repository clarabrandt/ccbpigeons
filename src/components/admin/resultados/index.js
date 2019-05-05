import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../firebase";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import withRoot from "../../../withRoot";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PanelComponent from '../panel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  tableContainer: {
    height: '100%',
    minHeight: '100px',
    padding: '25px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class Resultados extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      subitems: {},
      snapshot: {},
      selecionado: null,
      open: false,
      files: {},
      newSection: null,

    };

    this.storageRef = props.firebase.storage.ref();
    this.fileSelector = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.displayDetails = this.displayDetails.bind(this);
    this.fetchArquivos = this.fetchArquivos.bind(this);
    this.updateSubitem = this.updateSubitem.bind(this);
    this.uploadNewFiles = this.uploadNewFiles.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.addSection = this.addSection.bind(this);
  }

  componentDidMount() {
    this.fetchData()
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            items: data.resultados,
            selecionado: Object.keys(data.resultados)[0]
          },
          this.displayDetails
        );
      });
  }

  uploadNewFiles() {
    //If at least one file is selected, start the upload.
    if (this.fileSelector.current.files.length > 0) {
      const { files } = this.fileSelector.current;
      Object.keys(files).map(i => {
        const file = files[i];
        this.updateSubitem(i, file);
        this.uploadFile(i, file);
      });
    }
  }

  createDBRecord(newDBrecord) {
    const { selecionado } = this.state;
    const endpoint = `${this.baseUrl}resultados/${selecionado}`;
    return fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDBrecord)
    });
  }

  uploadFile(i, file) {
    const { selecionado } = this.state;
    let { name, ...metadata } = file;
    const newFileRef = this.storageRef.child(`resultados/${selecionado}/${name}`);
    const uploadTask = newFileRef.put(file, { customMetadata: metadata });

    //Upload the file to cloud storage
    uploadTask.on(
      "state_changed",
      snapshot => {
        this.updateSubitem(i, file, false, snapshot);
      },
      error => {
        console.error("Error while uploading new file", error);
      },
      () => {
        const url = uploadTask.snapshot.metadata;
        this.createDBRecord({ name: url.name, url: url.fullPath })
          .then(response => response.json())
          .then(json => {
            this.updateSubitem(json.id, file, true);
            this.displayDetails(json.id);
          });
      }
    );
  }

  fetchData() {
    const endpoint = `${this.baseUrl}resultados`;
    return fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  displayDetails() {
    this.fetchArquivos()
      .then(response => response.json())
      .then(subitems => {
        const result = {};
        subitems.map(file => {
          result[file.id] = file.data;
        });

        this.setState({
          subitems: result
        });
      });
  }

  updateSubitem(i, file, done = false, snapshot = {}) {
    this.setState({
      subitems: {
        ...this.state.subitems,
        [i]: { done, snapshot, name: file.name }
      }
    });
  }

  fetchArquivos() {
    const { selecionado } = this.state;
    const endpoint = `${this.baseUrl}resultados/${selecionado}`;
    return fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  handleChange(e) {
    const selecionado = e.target.value;
    if(selecionado === 'novo') {

    } else {
      this.setState(
        {
          selecionado
        },
        this.displayDetails
        );
    }
  }
  
  handleFormChange(e) {
    this.setState({
      newSection: e.target.value,
    })
  }

  addSection() {
    const endpoint = `${this.baseUrl}resultados`;
    const data = { name: this.state.newSection };
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          items: {
            ...this.state.items,
            [data.id]: { name: this.state.newSection },
          },
          open: false,
          selecionado: data.id,
        })
      })
  }


  render() {
    const { classes } = this.props;
    const { items, selecionado, subitems } = this.state;
    return (
      <PanelComponent title="Resultados">
        <Fragment>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="evento">Evento</InputLabel>
            <Select
              native
              value={this.state.selecionado || ""}
              onChange={this.handleChange}
            >
              {
                Object.keys(items).map((item) => {
                  return <option key={item} id={item} value={item}>{items[item].name}</option>
                })
              }
            </Select>
          </FormControl>
          <Button onClick={this.handleClickOpen}>Criar evento</Button>
          <div className={classes.tableContainer}>
            <div className={classes.tableContainer}>
              {
                !selecionado &&
                <div>
                  Você precisa selecionar ou criar um evento para então gerenciar seus arquivos
                </div>
              }
              {
                Object.keys(subitems).length < 1 &&
                <div>
                  Esse evento ainda não possui arquivos cadastrados
                </div>
              }
              {Object.keys(subitems).map((subitem) => {
                return <div key={subitem}>{subitem}</div>
              })}
            </div>
          </div>
          <div className={classes.tableContainer}>
            <label htmlFor="outlined-button-file">
              <input
                id="raised-button-file"
                style={{ display: 'none' }}
                className="file-input"
                type="file"
                name="resume"
                ref={this.fileSelector}
                onChange={this.uploadNewFiles}
                multiple
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span" className={classes.button}>
                  Upload
                    <CloudUploadIcon className={classes.rightIcon} />
                </Button>
              </label>
            </label>
          </div>
          <div className={classes.tableContainer}>

          </div>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogTitle>Escolha um nome para o evento</DialogTitle>
            <DialogContent>
              <form className={classes.container}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="standard-name"
                    label="Nome"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleFormChange}
                    margin="normal"
                  />
                </FormControl>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>
              <Button onClick={this.addSection} color="primary">
                Ok
            </Button>
            </DialogActions>
          </Dialog>
          
        </Fragment>
      </PanelComponent>
    )
  }
}

const ResultadosComponent = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(Resultados)));

export default Resultados;

export { ResultadosComponent };
