import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../firebase";
import "./Admin2.css";
import { Menu } from "./menu/Menu";

class Admin2 extends Component {
  render() {
    return (
      <Fragment>
        <div className="admin">
          <div className="admin-menu">
            <div className="admin-menu--content">
              <Menu />
            </div>
          </div>
          <div className="admin-layout">
            <div class="admin-layout--content">
              <div>a</div>
              <div>b</div>
              <div>c</div>
              <div>d</div>
              <div>r</div>
              <div>d</div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const AdminPage2 = compose(
  withRouter,
  withFirebase
)(Admin2);

export default Admin2;

export { AdminPage2 };
