"use strict";

/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import styles from "common/components/form_elements/inputs.scss";

/**
 * @param {string} propsValue
 * @param {string} inputValue
 */
const checkedRadioConditionFn = (propsValue, inputValue) => {
  return propsValue === inputValue;
};

/**
 * @param {array} propsValue
 * @param {string} inputValue
 */
const checkedCheckboxConditionFn = (propsValue, inputValue) => {
  return propsValue.includes(inputValue);
};

/** @returns {Object<string, function>} */
const checkedConditionObj = {
  radio: checkedRadioConditionFn,
  checkbox: checkedCheckboxConditionFn
};

/**
 * @param {Object} props
 * @param {Object} valueObj
 */
const mapFn = (props, valueObj) => {
  // @ts-ignore
  const conditionFn = checkedConditionObj[props.type];
  return (
    <div key={valueObj.value}>
      <input
        type={props.type}
        name={props.name}
        value={valueObj.value}
        checked={conditionFn(props.value, valueObj.value)}
        id={valueObj.value}
        onChange={props.handleInputChange}
      />
      <label htmlFor={valueObj.value}>{valueObj.label}</label>
    </div>
  );
};

/** @param {Object} props */
const CheckboxRadio = (props) => (
  <div className={styles.checkboxRadioWrapper}>
    {props.values.map(mapFn.bind(null, props))}
  </div>
);

CheckboxRadio.propTypes = {
  values: PropTypes.array.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string || PropTypes.array,
  handleInputChange: PropTypes.function
};

export default CheckboxRadio;
