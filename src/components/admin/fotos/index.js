import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../firebase";
import withRoot from "../../../withRoot";
import { withStyles } from '@material-ui/core/styles';
import PanelComponent from '../panel';
import { FilesListComponent } from "../files-list";
import { FileUploaderComponent } from '../file-uploader';

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

class Fotos extends Component {
  // baseUrl = "http://localhost:5001/pigeon-90548/us-central1/api/";
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      subitems: {},
      snapshot: {},
      directory: null,
      open: false,
      files: {},
      newSection: null,
      fetching: true
    };

    this.storageRef = props.firebase.storage.ref();
    this.displayDetails = this.displayDetails.bind(this);
    this.fetchArquivos = this.fetchArquivos.bind(this);
    this.updateSubitem = this.updateSubitem.bind(this);
  }

  componentDidMount() {
    const { directory } = this.state;
    const fetcher = !!directory ? this.fetchDirectories : this.fetchArquivos;
    fetcher()
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            items: data.fotos,
            directory: directory ? Object.keys(data.fotos)[0] : null,
          },
          this.displayDetails
        );
      });
  }

  fetchDirectories() {
    const endpoint = `${this.baseUrl}fotos`;
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
        const files = subitems.fotos;
        Object.keys(files).map(fileID => {
          const file = files[fileID];
          result[fileID] = file;
        });
        this.setState({
          subitems: result,
          fetching: false
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
    const { directory } = this.state;
    const endpoint = `${this.baseUrl}fotos/${directory ? directory : ""}`;
    return fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { items, directory, subitems, fetching } = this.state;
    return (
      <PanelComponent title="Fotos">
        <Fragment>
          <div className={classes.tableContainer}>
            <div className={classes.tableContainer}>
              {!fetching && Object.keys(subitems).length < 1 && (
                <div>Ainda nao ha fotos cadastradas</div>
              )}
              {!fetching && Object.keys(subitems).length > 0 && (
                <FilesListComponent
                  id={directory}
                  title={(directory && items[directory].name) || ""}
                  files={subitems}
                  deleteFile={this.deleteFile}
                  displayDetails={this.displayDetails}
                />
              )}
            </div>
          </div>
          <div className={classes.tableContainer}>
            <FileUploaderComponent
              component="fotos"
              directory={directory}
              evento={items[directory]}
              updateSubitem={this.updateSubitem}
              displayDetails={this.displayDetails}
            />
          </div>
        </Fragment>
      </PanelComponent>
    );
  }
}

const FotosComponent = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(Fotos)));

export default Fotos;

export { FotosComponent };
