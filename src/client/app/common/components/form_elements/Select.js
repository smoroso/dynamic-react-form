"use strict";

import React from "react";
import PropTypes from "prop-types";

const Select = props => (
  <div>
    <label htmlFor={props.name}>{props.label}</label>
    <select id={props.name} onChange={props.handleInputChange}>
      {props.values.map(v => (<option key={v.value} value={v.value}>{v.label}</option>))}
    </select>
  </div>
);

Select.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  values: PropTypes.array
};

export default Select;