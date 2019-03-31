import React from 'react';

export class Navbar extends React.Component {
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
                <div className="navbar-item" href="/admin">Logout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>);
  }
}
