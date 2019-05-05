import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../firebase";
import withRoot from "../../../withRoot";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

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
    console.log(this.props)
    const { classes, files, title, deleteFile } = this.props;
    console.log(files)
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Arquivos para {title}</TableCell>
              <TableCell>Deletar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(files).map(key => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {files[key].name}
                </TableCell>
                <TableCell >
                  <DeleteIcon className={classes.delete} onClick={() => this.deleteFile(key, files[key].url)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
