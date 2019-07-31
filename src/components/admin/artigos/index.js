import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../firebase";
import withRoot from "../../../withRoot";
import { withStyles } from '@material-ui/core/styles';
import { FilesListComponent } from "../files-list";

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

const fileListColumns = [
  { id: "name", numeric: false, disablePadding: false, align: 'left' ,label: "Nome" },
  { id: "title", numeric: false, disablePadding: false, align: 'left' ,label: "Título" },
  { id: "url", numeric: true, disablePadding: false, align: 'right' ,label: "Endereço" },
  { id: "size", numeric: true, disablePadding: false, align: 'right' ,label: "Tamanho" },
  { id: "type", numeric: true, disablePadding: false, align: 'right' ,label: "Tipo" },
];


class Artigos extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);
    this.state = {
      files: {},
      localFiles: {},
      snapshot: {},
      open: false,
      fetching: true,
      selecionado: null
    };

    this.storageRef = props.firebase.storage.ref();
    this.fetchArquivos = this.fetchArquivos.bind(this);
    this.updateFiles = this.updateFiles.bind(this);
    this.setLocalFiles = this.setLocalFiles.bind(this);
    this.removeLocalFile = this.removeLocalFile.bind(this);
  }

  /**
   * Component lifecycle
   */
  componentDidMount() {
    this.fetchArquivos();
  }

  /**
   * File uploader callbacks
   */

  updateFiles(id, progress, newFileID, newFile = {}) {
    const { localFiles, files } = this.state;
    const { url } = newFile;

    const newState = (progress === 1 && newFileID) ? {
      files: {
        ...files,
        [newFileID]: newFile
      }
    }
     :
    {
    localFiles: {
      ...localFiles,
      [id]: {
        ...localFiles[id],
        progress,
        url
      }
    }
  };

    const callback = () => (progress === 1 && newFileID) ? this.removeLocalFile(id) : null;
    
    this.setState(newState, callback);
  }

  setLocalFiles(selectedFiles) {
    const localFiles = {};
    console.log("selectedFiles", selectedFiles);
    Object.keys(selectedFiles).map(i => {
      const file = selectedFiles[i];
      localFiles[i] = {};
      localFiles[i]["file"] = file;
      localFiles[i]["progress"] = 0;
    });
    this.setState({
      localFiles
    });
  }

  removeLocalFile(index) {
    const { localFiles } = this.state;
    let { [index]: omit, ...res } = localFiles;
    this.setState({
      localFiles: res
    });
  }

  fetchArquivos() {
    const endpoint = `${this.baseUrl}artigos`;
    return fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          files: data.artigos,
          fetching: false
        });
      });
  }

  render() {
    const { files, localFiles, selecionado } = this.state;

    return (
      <Fragment>
        {/* {!fetching && Object.keys(files).length > 0 && ( */}
        <Fragment>
          <h3>Current Files</h3>
          <FilesListComponent
            id={selecionado}
            component={"artigos"}
            title={(selecionado && files[selecionado].name) || ""}
            fileListColumns={fileListColumns}
            files={files}
            deleteFile={this.deleteFile}
            setLocalFiles={this.setLocalFiles}
            updateFiles={this.updateFiles}
            localFiles={localFiles}
          />
        </Fragment>
        {/* )} */}
        {Object.keys(localFiles).length > 0 && (
          <Fragment>
            {`Uploading ${Object.keys(localFiles).length} files`}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const ArtigosComponent = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(Artigos)));

export default Artigos;

export { ArtigosComponent };
