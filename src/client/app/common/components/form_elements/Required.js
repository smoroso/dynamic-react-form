"use strict";

import React from "react";
import PropTypes from "prop-types";

const Required = props => (
  <span>{props.rules.flatMap(Object.keys).includes("required") && "*"}</span>
);

Required.propTypes = {
  rules: PropTypes.array
};

export default Required;