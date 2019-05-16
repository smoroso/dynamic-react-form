"use strict";

import React from "react";
import PropTypes from "prop-types";
import { Route, Link } from "react-router-dom";
import Form from "pages/dynamic_form/containers/Form";
import navStyles from "common/containers/navigation.scss";

function List({ match }) {
  return (
    <div>
      <ul className={navStyles.navbar}>
        <li><Link  className={navStyles.button2} to={`${match.url}/add_channel`}>Add Channel</Link></li>
        <li><Link  className={navStyles.button2} to={`${match.url}/create_channel`}>Create Channel</Link></li>
      </ul>

      <Route path={`${match.path}/:id`} component={Form} />
    </div>
  );
}

List.propTypes = {
  match: PropTypes.object
};

export default List;
