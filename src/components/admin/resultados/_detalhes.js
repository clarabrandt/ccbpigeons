import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../firebase/";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import withRoot from "../../../withRoot";
import { withStyles } from '@material-ui/core/styles';
// import "./style.css";

const generate = (element) => {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

class Detalhes extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);
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

  // handleClick = event => {
  //   const { email, password } = this.state;
  //   this.props.firebase
  //     .doSignInWithEmailAndPassword(email, password)
  //     .catch(error => {
  //       this.setState({ error });
  //     });

  //   event.preventDefault();
  // };

  // render() {
  //   const { open, subitems, classes } = this.props;
  //   console.log(subitems);
  //   return (
  //     (subitems && Object.keys(subitems).length) <= 0 ? (
  //       <div>Loading...</div>
  //     ) : (
  //       Object.keys(subitems).map(id => {
  //         const file = subitems[id];
  //         return (
  //           <Grid item xs={12} md={6}>
  //             <Typography variant="h6" className={classes.title}>
  //               Avatar with text and icon
  //             </Typography>
  //             <div className={classes.demo}>
  //               <List dense={true}>
  //                 {generate(
  //                   <ListItem>
  //                     <ListItemAvatar>
  //                       <Avatar>
  //                         <FolderIcon />
  //                       </Avatar>
  //                     </ListItemAvatar>
  //                     <ListItemText
  //                       primary="Single-line item"
  //                       secondary={true ? 'Secondary text' : null}
  //                     />
  //                     <ListItemSecondaryAction>
  //                       <IconButton aria-label="Delete">
  //                         <DeleteIcon />
  //                       </IconButton>
  //                     </ListItemSecondaryAction>
  //                   </ListItem>,
  //                 )}
  //               </List>
  //             </div>
  //           </Grid>
  //         )
  //       })  
  //     )
  //   )
  // }
  render() {
    const { open, subitems } = this.props;
    return (
      <div className={`admin-panel--details ${open}`}>
        <div className={`admin-panel--details-drawer`}>
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
                <div key={id}>
                  <a
                    href={subitems[id].url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {subitems[id].name}
                  </a>
                  <button
                    className="delete-button"
                    onClick={() => this.deleteFile(id, subitems[id].url)}
                  >
                    <i
                      className="fas fa-trash"
                      id={subitems[id]}
                      name={subitems[id]["name"]}
                    />
                  </button>
                </div>
              );
            })
          )}
          <div className="field">
            <div className="file is-primary">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="resume"
                  ref={this.fileSelector}
                  onChange={this.uploadNewFiles}
                  multiple
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload" />
                  </span>
                  <span className="file-label">Primary file…</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const DetalhesComponent = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(Detalhes)));

export default Detalhes;

export { DetalhesComponent };
