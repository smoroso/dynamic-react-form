import React from "react";
import PropTypes from "prop-types";

export default function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

FormattedDate.propTypes = {
  date: PropTypes.object
};
