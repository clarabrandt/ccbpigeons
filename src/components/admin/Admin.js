import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import "./Admin.css";
import api from "../../utils/api.js";
import { AboutComponent } from "./about";
import { ResultadosComponent } from "./resultados";
import { FotosComponent } from "./fotos";
import { ArtigosComponent } from "./artigos";
import { BlogComponent } from "./blog";
import { MidiaComponent } from "./midia";
import { NavbarComponent } from "./navbar";
import Menu from "./menu";
import { withFirebase } from "../firebase";
import { LoginPage } from "../login.js";
import withRoot from "../../withRoot";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';



const styles = theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  tableContainer: {
    height: '100%',
  },
  paper: {
    padding: theme.spacing.unit * 3,
    margin: theme.spacing.unit * 3,
  },
});

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "artigos",
      authUser: null,
      fetchingAuth: true,
      open: false,
    };
    this.goToComponent = this.goToComponent.bind(this);
    this.api = new api();
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ fetchingAuth: false, authUser })
        : this.setState({ fetchingAuth: false, authUser: null });
    });
  }

  handleDrawerOpen = () => this.setState({ open: true });
  handleDrawerClose = () => this.setState({ open: false });

  goToComponent(e) {
    e.preventDefault();
    e.stopPropagation()
    this.setState({
      clicked: e.target.id
    });
  }

  render() {
    const { authUser, fetchingAuth } = this.state;

    if (fetchingAuth && !authUser) {
      return <div>Loading</div>;
    }

    if (!fetchingAuth && !authUser) {
      return <LoginPage />;
    }
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavbarComponent open={this.state.open} handleDrawerOpen={this.handleDrawerOpen} />
        <Menu open={this.state.open} handleDrawerClose={this.handleDrawerClose} goToComponent={this.goToComponent} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {/* <Paper className={classes.paper}> */}
          {
            this.state.clicked === "sobre" &&
            <AboutComponent />
          }
          {
            this.state.clicked === "resultados" &&
            <ResultadosComponent />
          }
          {
            this.state.clicked === "blog" &&
            <BlogComponent />
          }
          {
            this.state.clicked === "midia" &&
            <MidiaComponent />
          }
          {
            this.state.clicked === "fotos" &&
            <FotosComponent />
          }
          {
            this.state.clicked === "artigos" &&
            <ArtigosComponent />
          }
          {/* </Paper> */}
        </main>
      </div>
    )
  }
}

const AdminPage = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(Admin)));

// export default Admin;
export default Admin;

export { AdminPage };
