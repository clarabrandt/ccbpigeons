import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import "./Admin.css";
import api from "../../utils/api.js";
import About from "./about";
import Blog from "./blog";
import Resultados from "./resultados";
import Midia from "./midia";
import { NavbarComponent } from "./navbar";
import { Menu } from "./menu";
import { withFirebase } from "../firebase";
import { LoginPage } from "../login.js";
import withRoot from "../../withRoot";
import { mainListItems, secondaryListItems } from './listItems';
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "resultados",
      authUser: null,
      fetchingAuth: true,
      open: true,
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

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };


  goToComponent(e) {
    this.setState({
      clicked: e.target.id
    });
  }

  render() {
    const { classes, open } = this.props;
    console.log(this.props)
    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavbarComponent open={open}/>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Orders
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            <SimpleLineChart />
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Products
          </Typography>
          <div className={classes.tableContainer}>
            <SimpleTable />
          </div>
        </main>
      </div>
    )
  }
  // render() {
  //   const { authUser, fetchingAuth } = this.state;

  //   if (fetchingAuth && !authUser) {
  //     return <div>Loading</div>;
  //   }

  //   if (!fetchingAuth && !authUser) {
  //     return <LoginPage />;
  //   }

  //   return (
  //     <Fragment>
  //       <NavbarComponent />
  //       <div className="columns" id="admin">
  //         <Menu goToComponent={this.goToComponent} />
  //         <div className="column is-10" id="list">
  //           {this.state.clicked === "sobre" && <About />}

  //           {this.state.clicked === "blog" && <Blog />}
  //           {this.state.clicked === "resultados" && <Resultados />}

  //           {this.state.clicked === "midia" && <Midia />}
  //         </div>
  //         <footer className="footer" />
  //       </div>
  //     </Fragment>
  //   );
  // }
}

const AdminPage = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(Admin)));

// export default Admin;
export default Admin;

export { AdminPage };
