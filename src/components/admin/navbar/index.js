import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../../firebase';
class Navbar extends React.Component {

  signOut = () => {
    this.props.firebase.auth.signOut();
  }
  render() {
    return (<nav className="navbar has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item brand-text" href="/admin">CCBPigeons</a>
          <div className="navbar-burger burger" data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" href="/admin">Account</a>

              <div className="navbar-dropdown">
                <a className="navbar-item" href="/admin">Dashboard</a>
                <a className="navbar-item" href="/admin">Profile</a>
                <a className="navbar-item" href="/admin">Settings</a>
                <hr className="navbar-divider" />
                <div className="navbar-item" onClick={this.signOut}>Logout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>);
  }
}

const NavbarComponent = compose(
  withRouter,
  withFirebase,
)(Navbar);

export default Navbar;

export { NavbarComponent };
