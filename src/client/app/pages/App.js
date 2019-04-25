"use strict";

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Forms from "pages/forms/containers/List";
import Clock from "common/containers/Clock";
import "pages/App.scss";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Home} />
        <Route path="/forms" component={Forms} />
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
        <Link to="/forms">Forms</Link>
      </li>
    </ul>
  );
}

export default App;
