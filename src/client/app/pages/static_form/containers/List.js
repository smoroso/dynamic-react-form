"use strict";

import React from "react";
import PropTypes from "prop-types";
import { Route, Link } from "react-router-dom";
import BasicForm from "pages/static_form/containers/BasicForm";
import ConnectedInputsForm from "pages/static_form/containers/ConnectedInputsForm";
import navStyles from "common/containers/navigation.scss";

function List({ match }) {
  return (
    <div>
      <ul className={navStyles.navbar}>
        <li><Link className={navStyles.button2} to={`${match.url}/basic`}>Basic</Link></li>
        <li><Link className={navStyles.button2} to={`${match.url}/connected_inputs`}>Connected Inputs</Link></li>
      </ul>

      <Route path={`${match.path}/basic`} component={BasicForm} />
      <Route path={`${match.path}/connected_inputs`} component={ConnectedInputsForm} />
    </div>
  );
}

List.propTypes = {
  match: PropTypes.object
};

export default List;
