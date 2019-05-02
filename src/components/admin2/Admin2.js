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
        <div class="admin">
          <div class="admin-menu">
            <div class="admin-menu--content">
              <Menu />
            </div>
          </div>
          <div class="admin-layout" />
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
