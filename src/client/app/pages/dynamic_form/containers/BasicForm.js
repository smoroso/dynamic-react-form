"use strict";

import React from "react";
import PropTypes from "prop-types";
import FormElement from "common/containers/FormElement";
import {debounce, tap} from "common/utils";

export default class BasicForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      children: []
    };

    this.validateAll = debounce(this.validateAll, 3000);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    return this.fetchFormDefinition("basic");
  }

  fetchFormDefinition(formId) {
    return fetch(`/api/getFormDefinition/${formId}`)
      .then(res => res.json())
      .then(data => this.setState(data.formDef));
  }

  validateAll() {
    // eslint-disable-next-line no-console
    console.log("This method has a debounce");
  }

  handleInputChange(childIndex, event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const child = {...this.state.children[childIndex]};
    child.value = value;
    this.setState(prevState => ({
      children: tap(prevState.children, (children) => children.splice(childIndex, 1, child))
    }), this.validateAll);
  }

  handleSubmit(event) {
    // eslint-disable-next-line no-console
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    const { children } = this.state;
    return (
      <div>
        <h3>List of input types</h3>
        <div>{children.length && 
          <form onSubmit={this.handleSubmit}>
            {children.map((child, index) => (
              <FormElement key={index} handleInputChange={this.handleInputChange.bind(this, index)} {...child} />
            ))}
            <input type="submit" value="Submit" />
          </form>
        }</div>
      </div>
    );
  }
}

BasicForm.propTypes = {
  children: PropTypes.array
};