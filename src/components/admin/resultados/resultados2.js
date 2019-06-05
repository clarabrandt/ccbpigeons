import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../firebase/";
import { withStyles } from '@material-ui/core/styles';
import withRoot from "../../../withRoot";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { DetalhesComponent } from "./_detalhes.js";
import "./style.css";
import ControlledExpansionPanels from '../accordion'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class Resultados extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      subitems: {},
      snapshot: {},
      selecionado: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.displayDetails = this.displayDetails.bind(this);
    this.fetchArquivos = this.fetchArquivos.bind(this);
    this.updateSubitem = this.updateSubitem.bind(this);
  }

  componentDidMount() {
    this.fetchData()
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            items: data.resultados,
            selecionado: Object.keys(data.resultados)[0]
          },
          this.displayDetails
        );
      });
  }

  fetchData() {
    const endpoint = `${this.baseUrl}resultados`;
    return fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  displayDetails() {
    console.log('Display details')
    this.fetchArquivos()
      .then(response => response.json())
      .then(subitems => {
        const result = {};
        subitems.map(file => {
          result[file.id] = file.data;
        });

        this.setState({
          subitems: result
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
    const endpoint = `${this.baseUrl}resultados/${selecionado}`;
    return fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  handleClick(e) {
    const selecionado = e.target.id;
    this.setState(
      {
        selecionado
      },
      this.displayDetails
    );
  }

  // render() {
  //   const { classes } = this.props;
  //   const { items, selecionado, subitems } = this.state;
  //   return (
  //     <div className={classes.root}>
  //       {
  //         Object.keys(items).map((key) => {
  //           return (
  //             <ControlledExpansionPanels key={key} evento={items[key]} id={key} onClick={this.handleClick}>
  //               <DetalhesComponent
  //                 id={key}
  //                 open={key === selecionado ? "open" : ""}
  //                 subitems={subitems}
  //                 displayDetails={this.displayDetails}
  //                 updateSubitem={this.updateSubitem}
  //               />
  //             </ControlledExpansionPanels>
  //           )
  //         })
  //       }
  //     </div>
  //   )
  // }
  render() {
    const { classes } = this.props;
    const { items, selecionado, subitems } = this.state;
    return (
      <div className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
              <TableCell align="right">Carbs (g)</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(subitems).map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}


const ResultadosComponent = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(Resultados)));

export default Resultados;

export { ResultadosComponent };
