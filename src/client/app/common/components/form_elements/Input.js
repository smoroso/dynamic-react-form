"use strict";

import React from "react";
import PropTypes from "prop-types";

const Input = props => (
  <div>
    <label>
      <span>{props.label}</span>
      <input type={props.type} value={props.value || ""} onChange={props.handleInputChange} />
    </label>
  </div>
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string
};

export default Input;