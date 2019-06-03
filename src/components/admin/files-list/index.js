import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../firebase";
import withRoot from "../../../withRoot";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from "@material-ui/icons/Delete";



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
  delete: {
    cursor: 'pointer',
    color: theme.palette.error.main,
  },
});

class FilesList extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);
    this.storageRef = props.firebase.storage.ref();
    this.deleteFile = this.deleteFile.bind(this);
  }

  deleteFile(id, url) {
    const fileRef = this.storageRef.child(url);
    fileRef
      .delete()
      .then(() => { })
      .catch(function (error) {
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

  render() {
    const { classes, files, title, deleteFile } = this.props;

    console.log('files --> ', files)
    return (
      <Paper className={classes.root}>
        <List>
          {
            Object.keys(files).map((key) => {
              const file = files[key];
              return (
                <ListItem key={key}>
                  <ListItemText>
                    <a href={file.url}>{file.name}</a>
                  </ListItemText>
                  <ListItemText>
                    <DeleteIcon
                      className={classes.delete}
                      onClick={() =>
                        this.deleteFile(key, files[key].url)
                      }
                    />
                  </ListItemText>
                </ListItem>
              );
            })
          }
        </List>
      </Paper>
    );
  }
}

const FilesListComponent = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(FilesList)));

export default FilesList;

export { FilesListComponent };
