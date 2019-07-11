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
      this.props.setLocalFiles(files);
      Object.keys(files).map(i => {
        const file = files[i];
        // this.props.updateFiles(i, file);
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
    const { component } = this.props;
    let { name, lastModified, lastModifiedDate, size, type, webkitRelativePath } = file;
    const metadata = {
      lastModified,
      ...lastModifiedDate,
      size,
      type,
      webkitRelativePath
    }

    const newFileRef = this.storageRef.child(`${component}/${name}`);
    const uploadTask = newFileRef.put(file, metadata);

    uploadTask.on(
      "state_changed",
      snapshot => {
        console.log("snapshot", snapshot);
      },
      error => {
        console.error("Error while uploading new file", error);
      },
      () => {
        const url = uploadTask.snapshot.metadata;
        this.createDBRecord({ name: url.name, url: url.fullPath, size, type })
          .then(response => response.json())
          .then(json => {
            this.props.updateFiles(json.id, file, url.fullPath, size, type);
          });
      }
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <label htmlFor="raised-button-file">
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
