import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { DetalhesComponent } from "./_detalhes.js";
import "./style.css";
import ControlledExpansionPanels from '../accordion'


const styles = theme => ({
  root: {
    width: '100%',
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

  render() {
    const { classes } = this.props;
    const { items, selecionado, subitems } = this.state;
    return (
      <div className={classes.root}>
        {
          Object.keys(items).map((key) => {
            return (
              <ControlledExpansionPanels key={key} evento={items[key]} id={key} onClick={this.handleClick}>
                <DetalhesComponent
                  id={key}
                  open={key === selecionado ? "open" : ""}
                  subitems={subitems}
                  displayDetails={this.displayDetails}
                  updateSubitem={this.updateSubitem}
                />
              </ControlledExpansionPanels>
            )
          })
        }
      </div>
    )

  }
}

export default withStyles(styles)(Resultados);