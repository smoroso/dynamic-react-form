"use strict";

import React from "react";
import PropTypes from "prop-types";

const Input = props => (
  <div>
    <label>
      <span>{props.label}</span>
      <input
        type={props.type}
        value={props.value}
        onChange={props.handleInputChange}
        disabled={props.disabled}
        required={props.required}
        min={props.min}
        max={props.max}
      />
    </label>
    {props.errors.length}
  </div>
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  errors: PropTypes.array
};

export default Input;