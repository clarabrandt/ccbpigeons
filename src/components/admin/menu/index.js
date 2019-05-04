import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { mainListItems } from "../listItems";
import withRoot from "../../../withRoot";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import PersonIcon from "@material-ui/icons/Person";
import PhotoIcon from "@material-ui/icons/Photo";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import TvIcon from "@material-ui/icons/Tv";
import DescriptionIcon from "@material-ui/icons/Description";
import "./index.css";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  }
});
class Menu extends React.Component {
  changeClass() {
    document.getElementById("item").className = "active";
  }
  render() {
    const { classes } = this.props;
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !this.props.open && classes.drawerPaperClose
          )
        }}
        open={this.props.open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={this.props.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem button onClick={this.props.goToComponent}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Sobre" />
            </ListItem>
            <ListItem button onClick={this.props.goToComponent} id="blog">
              <ListItemIcon>
                <KeyboardIcon />
              </ListItemIcon>
              <ListItemText id="blog" primary="Blog" />
            </ListItem>
            <ListItem button onClick={this.props.goToComponent} id="resultados">
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText id="resultados" primary="Resultados" />
            </ListItem>
            <ListItem button onClick={this.props.goToComponent} id="midia">
              <ListItemIcon>
                <TvIcon />
              </ListItemIcon>
              <ListItemText id="midia" primary="Mídia" />
            </ListItem>
            <ListItem button onClick={this.props.goToComponent} id="fotos">
              <ListItemIcon>
                <PhotoIcon />
              </ListItemIcon>
              <ListItemText id="fotos" primary="Fotos" />
            </ListItem>
            <ListItem button onClick={this.props.goToComponent} id="artigos">
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText id="artigos" primary="Artigos" />
            </ListItem>
          </div>
        </List>
      </Drawer>
    );
  }
}

// export default Admin;
export default withRoot(withStyles(styles)(Menu));
