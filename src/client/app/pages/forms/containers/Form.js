"use strict";

import React from "react";
import PropTypes from "prop-types";

export default class Form extends React.Component {
  componentDidMount() {
    const {match} = this.props;
    return this.fetchFormDefinition(match.params.id);
  }

  fetchFormDefinition(formId) {
    return fetch(`/api/getFormDefinition/${formId}`)
      .then(res => res.json());
  }

  render() {
    const {match} = this.props;
    return (
      <h3>Form for: {match.params.id}</h3>
    );
  }
}

Form.propTypes = {
  match: PropTypes.object
};