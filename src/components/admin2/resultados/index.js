import React, { Component } from "react";
import ExpansionPanel from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withRoot from '../../../withRoot'
// import "./Resultados.css";

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
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
      selecionado: null,
      expanded: null
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

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleClick(e) {
    const selecionado = e.target.id;
    this.setState(
      {
        selecionado
      },
      this.displayDetails
    );
  }

  // renderList() {
  //   const { items, selecionado, subitems } = this.state;
  //   const { classes } = this.props;
  //   return (
  //     <div className={classes.root}>
  //       <div className="admin-layout--content1">
  //       <ExpansionPanel>
  //         {
  //             Object.keys(items).map((key) => {
  //               return(
  //                   <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
  //                     <Typography className={classes.heading}>Expansion Panel 1</Typography>
  //                   </ExpansionPanelSummary>
  //                   <ExpansionPanelDetails>
  //                     <Typography>
  //                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
  //                       sit amet blandit leo lobortis eget.
  //                   </Typography>
  //                   </ExpansionPanelDetails>
  //               )
  //           })
  //         }
  //       </ExpansionPanel>
  //     </div>
  //   </div>
  //   )
  // }
  renderList() {
    const { items, selecionado, subitems, expanded } = this.state;
    const { classes } = this.props;
    console.log("subitems : ", subitems);
    return (
      <div className="admin-layout--content1">
        {Object.keys(items).map(key => {
          return (
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>General settings</Typography>
                <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                  maximus est, id dignissim quam.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            // <Fragment key={key}>
            //   <div className="" onClick={this.handleClick}>
            //     <div id={key} className="admin-layout--item--title">
            //       {items[key].nome}
            //     </div>
            //   </div>
            //   <ResultadosComponent
            //     id={key}
            //     open={key === selecionado ? "open" : ""}
            //     subitems={subitems}
            //     displayDetails={this.displayDetails}
            //     updateSubitem={this.updateSubitem}
            //   />
            // </Fragment>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        {!this.state.opcao && this.renderList()}
        {(this.state.opcao === "adicionar" || this.state.opcao === "editar") &&
          this.renderForm()}
        <div className={`admin-buttons ${this.state.opcao && "display"}`} />
      </div>
    );
  }
  // render() {
  //   return (
  //     <div>
  //       <div>uai</div>
  //       <ExpansionPanel />
  //     </div>
  //   )
  // }
}

export default withRoot(withStyles(styles)(Resultados));
