"use strict";

import React from "react";
import PropTypes from "prop-types";
import { Route, Link } from "react-router-dom";
import InputsList from "pages/dynamic_form/containers/InputsList";
import BasicForm from "pages/dynamic_form/containers/BasicForm";
import NestedForm from "pages/dynamic_form/containers/NestedForm";

function List({ match }) {
  return (
    <div>
      <ul>
        <li><Link to={`${match.url}/inputs`}>Inputs List</Link></li>
        <li><Link to={`${match.url}/basic`}>Basic</Link></li>
        <li><Link to={`${match.url}/nested`}>Nested</Link></li>
      </ul>

      <Route path={`${match.path}/inputs`} component={InputsList} />
      <Route path={`${match.path}/basic`} component={BasicForm} />
      <Route path={`${match.path}/nested`} component={NestedForm} />
    </div>
  );
}

List.propTypes = {
  match: PropTypes.object
};

export default List;
