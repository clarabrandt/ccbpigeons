import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../firebase";
import api from "../../utils/api.js";
import "./Admin2.css";
import { Menu } from "./menu/Menu";
import About from "./about/About";
import Blog from "./blog/Blog";

class Admin2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "blog",
      authUser: null,
      fetchingAuth: true
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

  goToComponent(e) {
    this.setState({
      clicked: e.target.id
    });
  }

  render() {
    return (
      <Fragment>
        <div className="admin">
          <div className="admin-menu">
            <div className="admin-menu--content">
              <Menu goToComponent={this.goToComponent} />
            </div>
          </div>
          <div className="admin-layout">
            <div className="admin-layout--content">
              {this.state.clicked === "sobre" && <About />}
              {this.state.clicked === "blog" && <Blog />}
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
