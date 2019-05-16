"use strict";

import React from "react";
import PropTypes from "prop-types";
import styles from "common/components/form_elements/inputs.scss";

const Checkbox = props => (
  <div className={styles.checkboxWrapper}>
    <label>
      <input
        type={props.type}
        onChange={props.handleInputChange}
      />
      <span className={styles.checkmark}></span>
      <span>{props.label}</span>
    </label>
  </div>
);

Checkbox.propTypes = {
  type: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string
};

export default Checkbox;