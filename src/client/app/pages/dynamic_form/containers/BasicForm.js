"use strict";

import React from "react";
import PropTypes from "prop-types";
import FormSection from "common/containers/FormSection";

export default class BasicForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      children: []
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  componentDidMount() {
    return this.fetchFormDefinition("basic");
  }

  fetchFormDefinition(formId) {
    return fetch(`/api/getFormDefinition/${formId}`)
      .then(res => res.json())
      .then(this.setState.bind(this));
  }

  handleSubmitClick(event) {
    // eslint-disable-next-line no-console
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    const {children} = this.state;
    return (
      <div>
        {children.length && <FormSection formChildren={children} handleSubmitClick={this.handleSubmitClick} />}
      </div>
    );
  }
}

BasicForm.propTypes = {
  children: PropTypes.array
};