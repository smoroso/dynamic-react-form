"use strict";

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DynamicFormsList from "pages/dynamic_form/containers/List";
import StaticFormsList from "pages/static_form/containers/List";
import ConcreteFormsList from "pages/concrete_form/containers/List";
import Clock from "common/containers/Clock";
import "pages/App.scss";
import navStyles from "common/containers/navigation.scss";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Home} />
        <Route path="/static_form" component={StaticFormsList} />
        <Route path="/dynamic_form" component={DynamicFormsList} />
        <Route path="/concrete" component={ConcreteFormsList} />
      </div>
    </Router>
  );
}

function Home() {
  return <h2><Clock/></h2>;
}

function Header() {
  return (
    <ul className={navStyles.navbar}>
      <li><Link to="/" className={navStyles.button1}>Home</Link></li>
      <li><Link to="/static_form" className={navStyles.button1}>Static Form</Link></li>
      <li><Link to="/dynamic_form" className={navStyles.button1}>Dynamic Form</Link></li>
      <li><Link to="/concrete" className={navStyles.button1}>Concrete Form</Link></li>
    </ul>
  );
}

export default App;
