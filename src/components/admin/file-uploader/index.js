import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../firebase";
import withRoot from "../../../withRoot";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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

class FileUploader extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";
  // baseUrl = "http://localhost:5001/pigeon-90548/us-central1/api/";

  constructor(props) {
    super(props);

    this.storageRef = props.firebase.storage.ref();
    this.fileSelector = React.createRef();
    this.uploadFile = this.uploadFile.bind(this);
    this.uploadNewFiles = this.uploadNewFiles.bind(this);
  }

  uploadNewFiles() {
    //If at least one file is selected, start the upload.
    if (this.fileSelector.current.files.length > 0) {
      const { files } = this.fileSelector.current;
      Object.keys(files).map(i => {
        const file = files[i];
        this.props.updateSubitem(i, file);
        this.uploadFile(i, file);
      });
    }
  }

  createDBRecord(newDBrecord) {
    const { directory, component } = this.props;
    const endpoint = `${this.baseUrl}${component}/${
      directory ? directory : ""
      }`;
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
    const { directory, component, immediateUpload = true } = this.props;
    let { name, ...metadata } = file;
    const subpath = directory ? `${directory}/${name}` : `${name}`;
    const newFileRef = this.storageRef.child(`${component}/${subpath}`);
    const uploadTask = newFileRef.put(file, { customMetadata: metadata });

    //Upload the file to cloud storage
    uploadTask.on(
      "state_changed",
      snapshot => {
        console.log("snapshot", snapshot);
        this.props.updateSubitem(i, file, false, snapshot);
      },
      error => {
        console.error("Error while uploading new file", error);
      },
      () => {
        const url = uploadTask.snapshot.metadata;
        immediateUpload ?
          this.createDBRecord({ name: url.name, url: url.fullPath })
            .then(response => response.json())
            .then(json => {
              console.log("json --> ", json);
              // this.props.updateSubitem(json.id, file, true);
              this.props.displayDetails(json.id);
            })
          :
          console.log("HOI OI")
      }
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <label htmlFor="outlined-button-file">
        <input
          id="raised-button-file"
          style={{ display: "none" }}
          className="file-input"
          type="file"
          name="resume"
          ref={this.fileSelector}
          onChange={this.uploadNewFiles}
          multiple
        />
        <label htmlFor="raised-button-file">
          <Button
            variant="contained"
            component="span"
            className={classes.button}
          >
            Upload <CloudUploadIcon className={classes.rightIcon} />
          </Button>
        </label>
      </label>
    );
  }
}

const FileUploaderComponent = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(FileUploader)));

export default FileUploader;

export { FileUploaderComponent };
