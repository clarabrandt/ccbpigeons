import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from "../../firebase/";

class Detalhes extends Component {
  baseUrl = 'https://us-central1-pigeon-90548.cloudfunctions.net/api/';

  constructor(props) {
    super(props);

    // this.state = {
    //   subitems: {},
    // }

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
      Object.keys(files).map((i) => {
        const file = files[i];
        this.uploadFile(file);
      })
    }
  }

  deleteFile(id, url) {
    const fileRef = this.storageRef.child(url);
    fileRef.delete().then(() => {
    }).catch(function (error) {
      // Uh-oh, an error occurred!
    }).finally(() => {
      this.deleteDBRecord(id)
        .then(response => response.json())
        .then(json => this.props.displayDetails(json.id))
        .catch(err => console.log(err))
    });
  }

  deleteDBRecord(fileid) {
    const { id } = this.props;
    const endpoint = `${this.baseUrl}resultados/${id}/${fileid}`;
    return fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, fileid}),
    });
  }

  uploadFile(file) {
    const { id } = this.props;
    let { name, ...metadata } = file;
    const newFileRef = this.storageRef.child(`resultados/${id}/${name}`);
    const uploadTask = newFileRef.put(file, { customMetadata: metadata });

    //Upload the file to cloud storage
    uploadTask.on('state_changed', snapshot => {
      console.log("Snapchat --> ", snapshot)
    },
    error => {
      console.error('Error while uploading new file', error);
    }, () => {
      // console.log('New file uploaded. Size:', uploadTask.snapshot.totalBytes, 'bytes.');
      const url = uploadTask.snapshot.metadata;
      // console.log('File available at', url);
      this.createDBRecord({ name: url.name, url: url.fullPath })
        .then(response => response.json())
        .then(json => this.props.displayDetails(json.id))
    }); 
  }

  createDBRecord(newDBrecord) {
    const { id } = this.props;
    const endpoint = `${this.baseUrl}resultados/${id}`;
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDBrecord),
    });
  }

  handleClick = (event) => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  render() {
    const { open, subitems } = this.props;
    return (
      <div className={`admin-panel--details ${open}`}>
        <div className={`admin-panel--details-drawer`}>
          {
            (subitems && Object.keys(subitems).length) <= 0 ?
              <div>
                Loading...
              </div>
            :
              Object.keys(subitems).map((id) => {
                return (
                  <div key={id}>
                    <a href={subitems[id].url} target="_blank" rel="noopener noreferrer">{subitems[id].name}</a>
                    <span className="icon has-text-danger delete-file" onClick={() => this.deleteFile(id, subitems[id].url)}>
                      <i className="fas fa-trash" id={subitems[id]} name={subitems[id]['name']}></i>
                    </span>
                  </div>
                )
              })
          }
          <div className="field">
            <div className="file is-primary">
              <label className="file-label">
                <input className="file-input" type="file" name="resume" ref={this.fileSelector} onChange={this.uploadNewFiles} multiple/>
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">
                    Primary file…
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const DetalhesComponent = compose(
  withRouter,
  withFirebase,
)(Detalhes);

export default Detalhes;

export { DetalhesComponent };
