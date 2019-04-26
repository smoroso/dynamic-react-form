"use strict";

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DynamicFormsList from "pages/dynamic_form/containers/List";
import StaticFormsList from "pages/static_form/containers/List";
import Clock from "common/containers/Clock";
import "pages/App.scss";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Home} />
        <Route path="/static_form" component={StaticFormsList} />
        <Route path="/dynamic_form" component={DynamicFormsList} />
      </div>
    </Router>
  );
}

function Home() {
  return <h2><Clock/></h2>;
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/static_form">Static Form</Link>
      </li>
      <li>
        <Link to="/dynamic_form">Dynamic Form</Link>
      </li>
    </ul>
  );
}

export default App;
