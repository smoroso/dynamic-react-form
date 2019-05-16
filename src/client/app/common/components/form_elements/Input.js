"use strict";

import React from "react";
import PropTypes from "prop-types";
import styles from "common/components/form_elements/inputs.scss";

const Input = props => (
  <div className={styles.inputWrapper}>
    <label>
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
    <ul>
      {
        props.errors.map((err, index) =>
          <li key={index}>{err}</li>
        )
      }
    </ul>
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