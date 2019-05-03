import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../firebase/";
import "./Resultados.css";

class Resultados extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);

    // this.state = {
    //   subitems: {},
    // }

    console.log(props);
    this.storageRef = props.firebase.storage.ref();
    this.fileSelector = React.createRef();
    this.uploadNewFiles = this.uploadNewFiles.bind(this);
    this.createDBRecord = this.createDBRecord.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
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

  deleteFile(id, url) {
    const fileRef = this.storageRef.child(url);
    fileRef
      .delete()
      .then(() => {})
      .catch(function(error) {
        // Uh-oh, an error occurred!
      })
      .finally(() => {
        this.deleteDBRecord(id)
          .then(response => response.json())
          .then(json => this.props.displayDetails(json.id))
          .catch(err => console.log(err));
      });
  }

  deleteDBRecord(fileid) {
    const { id } = this.props;
    const endpoint = `${this.baseUrl}resultados/${id}/${fileid}`;
    return fetch(endpoint, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, fileid })
    });
  }

  uploadFile(i, file) {
    const { id } = this.props;
    let { name, ...metadata } = file;
    const newFileRef = this.storageRef.child(`resultados/${id}/${name}`);
    const uploadTask = newFileRef.put(file, { customMetadata: metadata });

    //Upload the file to cloud storage
    uploadTask.on(
      "state_changed",
      snapshot => {
        this.props.updateSubitem(i, file, false, snapshot);
      },
      error => {
        console.error("Error while uploading new file", error);
      },
      () => {
        const url = uploadTask.snapshot.metadata;
        this.createDBRecord({ name: url.name, url: url.fullPath })
          .then(response => response.json())
          .then(json => {
            this.props.updateSubitem(json.id, file, true);
            this.props.displayDetails(json.id);
          });
      }
    );
  }

  createDBRecord(newDBrecord) {
    const { id } = this.props;
    const endpoint = `${this.baseUrl}resultados/${id}`;
    return fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDBrecord)
    });
  }

  handleClick = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { open, subitems } = this.props;
    return (
      <div className={`admin-layout--details ${open}`}>
        <div className={`admin-layout--details-drawer`}>
          {(subitems && Object.keys(subitems).length) <= 0 ? (
            <div>Loading...</div>
          ) : (
            Object.keys(subitems).map(id => {
              const file = subitems[id];

              return file.done === false ? (
                <progress
                  key={id}
                  className="progress is-primary"
                  value={file.snapshot.bytesTransferred}
                  max={file.snapshot.totalBytes}
                >
                  15%
                </progress>
              ) : (
                <div key={id} className="admin-layout--item resultados">
                  <a
                    className="admin-layout--item--title"
                    href={subitems[id].url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {subitems[id].name}
                  </a>

                  <button
                    className="admin-layout--delete--button"
                    onClick={() => this.deleteFile(id, subitems[id].url)}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          )}
          <div className="field">
            <div className="file is-primary">
              <label className="admin-buttons">
                <input
                  className="admin-button"
                  type="file"
                  name="resume"
                  ref={this.fileSelector}
                  onChange={this.uploadNewFiles}
                  multiple
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fa fa-upload" />
                  </span>
                  <span className="admin-button file">Primary file…</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ResultadosComponent = compose(
  withRouter,
  withFirebase
)(Resultados);

export default Resultados;

export { ResultadosComponent };
