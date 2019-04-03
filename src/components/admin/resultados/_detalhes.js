import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from "../../firebase/";

class Detalhes extends Component {
  constructor(props) {
    super(props);

    this.storageRef = props.firebase.storage.ref();
    this.fileSelector = React.createRef();
    this.handleFileSelection = this.handleFileSelection.bind(this);
  }

  handleFileSelection() {
    const { id } = this.props;
    if (this.fileSelector.current.files.length > 0) {
      const { files } = this.fileSelector.current;
      Object.keys(files).map(i => {
        const file = files[i];
        let { name } = file;
        const newFileRef = this.storageRef.child(`${id}/${name}`);
        const uploadTask = newFileRef.put(file)
        
        uploadTask.on('state_changed', function (snapshot) {
        
        }, function (error) {
            console.log(error);
        }, function () {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            // newFileRef.updateMetadata(metadata);
            const newDBrecord = {
              nome: name,
              url: downloadURL,
            }
            this.createDBRecord(newDBrecord);
            
          });
        });  
      })
    }
  }

  createDBRecord(newDBrecord) {
    const endpoint = `${this.baseUrl}blog`;
    const data = { titulo: this.state.titulo, conteudo: this.state.conteudo };
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    this.setState({
      opcao: null,
    })
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
            (subitems && subitems.length) <= 0 ?
              <div>
                Loading...
              </div>
            :
              subitems.map((subitem) => {
                return (
                  <div key={subitem.nome}>
                    <a href={subitem.url} target="_blank" rel="noopener noreferrer">{subitem.nome}</a>
                  </div>
                )
              })
          }
          <div className="field">
            <div className="file is-primary">
              <label className="file-label">
                <input className="file-input" type="file" name="resume" ref={this.fileSelector} onChange={this.handleFileSelection} multiple/>
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
