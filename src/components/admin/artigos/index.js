import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../firebase";
import withRoot from "../../../withRoot";
import { withStyles } from '@material-ui/core/styles';
import PanelComponent from '../panel';
import { FileUploaderComponent } from '../file-uploader';

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

class Artigos extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      subitems: {},
      snapshot: {},
      selecionado: null,
      open: false,
      files: {},
      newSection: null,
      fetching: true,
    };

    this.storageRef = props.firebase.storage.ref();
    this.displayDetails = this.displayDetails.bind(this);
    this.fetchArquivos = this.fetchArquivos.bind(this);
    this.updateSubitem = this.updateSubitem.bind(this);
  }

  componentDidMount() {
    // this.fetchData()
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState(
    //       {
    //         items: data.artigos,
    //         selecionado: Object.keys(data.artigos)[0]
    //       },
    //       this.displayDetails
    //     );
    //   });
  }

  fetchData() {
    const endpoint = `${this.baseUrl}artigos`;
    return fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  displayDetails() {
    this.fetchArquivos()
      .then(response => response.json())
      .then(subitems => {
        const result = {};
        subitems.map(file => {
          result[file.id] = file.data;
        });

        this.setState({
          subitems: result,
          fetching: false,
        });
      });
  }

  updateSubitem(i, file, done = false, snapshot = {}) {
    this.setState({
      subitems: {
        ...this.state.subitems,
        [i]: { done, snapshot, name: file.name }
      }
    });
  }

  fetchArquivos() {
    const { selecionado } = this.state;
    const endpoint = `${this.baseUrl}artigos/${selecionado}`;
    return fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { items, selecionado } = this.state;
    return (
      <PanelComponent title="Artigos">
        <Fragment>
          <div className={classes.tableContainer}>
            <FileUploaderComponent component="artigos" id={selecionado} evento={items[selecionado]} updateSubitem={this.updateSubitem} displayDetails={this.displayDetails}/>
          </div>
        </Fragment>
      </PanelComponent>
    )
  }
}

const ArtigosComponent = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(Artigos)));

export default Artigos;

export { ArtigosComponent };
