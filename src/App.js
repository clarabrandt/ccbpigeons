import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout.js";
import { LoginPage } from "./components/login.js";

import { AdminPage } from "./components/admin/Admin.js";
import { AdminPage2 } from "./components/admin2/Admin2.js";

class App extends Component {
  render() {
    return (
      <div className="app">
        <BrowserRouter basename={process.env.PUBLIC_URL} />
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/admin2" component={AdminPage2} />
          <Route path={process.env.PUBLIC_URL + "/"} component={Layout} />
          <Route path="/home" component={Layout} />
          <Route path="/sobre" component={Layout} />
          <Route path="/blog" component={Layout} />
          <Route path="/resultados" component={Layout} />
          <Route path="/midia" component={Layout} />
        </Switch>
      </div>
    );
  }
}

export default App;
