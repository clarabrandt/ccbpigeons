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

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "resultados",
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
    const { authUser, fetchingAuth } = this.state;

    if (fetchingAuth && !authUser) {
      return <div>Loading</div>;
    }

    if (!fetchingAuth && !authUser) {
      return <LoginPage />;
    }

    return (
      <Fragment>
        <NavbarComponent />
        <div className="columns" id="admin">
          <Menu goToComponent={this.goToComponent} />
          <div className="column is-10 messages hero is-fullheight" id="list">
            {this.state.clicked === "sobre" && <About />}

            {this.state.clicked === "blog" && <Blog />}
            {this.state.clicked === "resultados" && <Resultados />}

            {this.state.clicked === "midia" && <Midia />}
          </div>
          <footer className="footer" />
        </div>
      </Fragment>
    );
  }
}

const AdminPage = compose(
  withRouter,
  withFirebase
)(Admin);

export default Admin;

export { AdminPage };
