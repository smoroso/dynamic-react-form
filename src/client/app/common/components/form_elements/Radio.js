"use strict";

import React from "react";
import PropTypes from "prop-types";
import styles from "common/components/form_elements/inputs.scss";

const Radio = props => (
  <div className={styles.radioWrapper}>
    {props.values.map(v => (
      <div key={v.value}>
        <input type={props.type} name={props.name} value={v.value} id={v.value} onChange={props.handleInputChange} />
        <label htmlFor={v.value}>{v.label}</label>
      </div>
    ))}
  </div>
);

Radio.propTypes = {
  type: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  values: PropTypes.array
};

export default Radio;