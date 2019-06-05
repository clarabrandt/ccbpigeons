import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../firebase";
import Typography from '@material-ui/core/Typography';
import withRoot from "../../../withRoot";
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  tableContainer: {
    height: '100%',
  },
});
class Panel extends Component {

  render() {
    return (
      <Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          {this.props.title}
        </Typography>
        <div>
          {this.props.children}
        </div>
      </Fragment>
    )
  }
}


const PanelComponent = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(Panel)));

export default Panel;

export { PanelComponent };
