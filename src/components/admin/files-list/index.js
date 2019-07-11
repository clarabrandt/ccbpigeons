import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../firebase";
import withRoot from "../../../withRoot";
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import EnhancedTableHead from './tablehead';
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CardContent from "@material-ui/core/CardContent";


const styles = theme => ({
  card: {
    backgroundColor: "#f5f5f5"
  },
  cardHeader: {
    backgroundColor: "#e2e2e2",
    display: "flex",
    justifyContent: "flex-end",
  },
  tableContainer: {
    height: "100%",
    minHeight: "100px",
    padding: "25px"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  delete: {
    cursor: "pointer",
    color: theme.palette.error.main
  },
  row: {
    backgroundColor: "#ffffff",
    cursor: "pointer",
    hover: {
      backgroundColor: "#f5f5f5"
    }
  },
  cell: {}
});

class FilesList extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);

    this.state = {
      order: "name",
      orderBy: "",
      selected: []
    };
    this.storageRef = props.firebase.storage.ref();
    this.fileSelector = React.createRef();
    this.deleteFile = this.deleteFile.bind(this);
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

  handleSelectAllClick(event) {
    const { files } = this.props;
    if (event.target.checked) {
      const newSelecteds = files.map(n => n.name);
      this.setState({
        selected: newSelecteds
      });
      return;
    }
    this.setState({
      selected: []
    });
  }

  handleRequestSort(event, property) {
    const { orderBy, order } = this.state;
    const isDesc = orderBy === property && order === "desc";

    this.setState({
      order: isDesc ? "asc" : "desc",
      orderBy: property
    });
  }

  selectNewFiles = () => {
    //If at least one file is selected, start the upload.
    if (this.fileSelector.current.files.length > 0) {
      const { files } = this.fileSelector.current;
      this.props.setLocalFiles(files);
      Object.keys(files).map(i => {
        const file = files[i];
        console.log(file);
        // this.props.updateFiles(i, file);
        // this.uploadFile(i, file);
      });
    }
  };

  handleRowClick = (e, file) => {
    console.log(e, file);
  }

  renderTableRow = file => {
    const { classes, fileListColumns } = this.props;
    return (
      <TableRow
        className={classes.row}
        hover
        onClick={event => this.handleRowClick(event, file)}
        role="checkbox"
        aria-checked={true}
        tabIndex={-1}
        // selected={isItemSelected}
      >
        <TableCell className={classes.cell} padding="checkbox">
          <Checkbox
          // checked={isItemSelected}
          // inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCell>
        {
          fileListColumns.map((column) => {
            return (
              <TableCell key={column.id} className={classes.cell} align={column.align}>
                {file[column.id]}
              </TableCell>
            );
          })
        }
        {/* <TableCell
          className={classes.cell}
          component="th"
          id={123}
          scope="cell"
          padding="none"
        >
          {file.name}
        </TableCell>
        <TableCell className={classes.cell} align="right">
          {file.url}
        </TableCell>
        <TableCell className={classes.cell} align="right">
          {file.size}
        </TableCell>
        <TableCell className={classes.cell} align="right">
          {file.type}
        </TableCell> */}
      </TableRow>
    );
  };

  render = () => {
    const { classes, files, localFiles, fileListColumns } = this.props;
    const { order, orderBy, selected } = this.state;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardHeader}>
          <label htmlFor="raised-button-file">
            <input
              id="raised-button-file"
              style={{ display: "none" }}
              className="file-input"
              type="file"
              name="resume"
              ref={this.fileSelector}
              onChange={this.selectNewFiles}
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
        </CardContent>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
            rowCount={files.length}
            fileListColumns={fileListColumns}
          />

          <TableBody>
            {Object.keys(localFiles).map(key =>
              this.renderTableRow(localFiles[key])
            )}
            {Object.keys(files).map(key => this.renderTableRow(files[key]))}
          </TableBody>
        </Table>
      </Card>
    );
  };
}

const FilesListComponent = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(FilesList)));

export default FilesList;

export { FilesListComponent };
