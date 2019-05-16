"use strict";

import React from "react";
import PropTypes from "prop-types";
import { Route, Link } from "react-router-dom";
import BasicForm from "pages/static_form/containers/BasicForm";
import ConnectedInputsForm from "pages/static_form/containers/ConnectedInputsForm";
import NestedForm from "pages/static_form/containers/nested_form";
import NestedNestedForm from "pages/static_form/containers/BasicForm";
import SavePendingForm from "pages/static_form/containers/BasicForm";
import CssCustomizationForm from "pages/static_form/containers/BasicForm";
import navStyles from "common/containers/navigation.scss";

function List({ match }) {
  return (
    <div>
      <ul className={navStyles.navbar}>
        <li><Link className={navStyles.button2} to={`${match.url}/basic`}>Basic</Link></li>
        <li><Link className={navStyles.button2} to={`${match.url}/connected_inputs`}>Connected Inputs</Link></li>
        <li><Link className={navStyles.button2} to={`${match.url}/nested`}>Nested</Link></li>
        <li><Link className={navStyles.button2} to={`${match.url}/nested_nested`}>Nested Nested</Link></li>
        <li><Link className={navStyles.button2} to={`${match.url}/save_pending`}>Save Pending</Link></li>
        <li><Link className={navStyles.button2} to={`${match.url}/css_customization`}>Css Customization</Link></li>
      </ul>

      <Route path={`${match.path}/basic`} component={BasicForm} />
      <Route path={`${match.path}/connected_inputs`} component={ConnectedInputsForm} />
      <Route path={`${match.path}/nested`} component={NestedForm} />
      <Route path={`${match.path}/nested_nested`} component={NestedNestedForm} />
      <Route path={`${match.path}/save_pending`} component={SavePendingForm} />
      <Route path={`${match.path}/css_customization`} component={CssCustomizationForm} />
    </div>
  );
}

List.propTypes = {
  match: PropTypes.object
};

export default List;
