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

class FilesList extends Component {
  render() {
    console.log(this.props)
    const { classes, files, title } = this.props;
    console.log(files)
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Arquivos para {title}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(files).map(key => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {files[key].name}
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
