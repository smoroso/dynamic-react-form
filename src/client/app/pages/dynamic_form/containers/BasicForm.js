"use strict";

import React from "react";
import PropTypes from "prop-types";
import FormElement from "common/containers/FormElement";
import {debounce, tap} from "common/utils";
import {validateForRule} from "common/validations";
import {PRISTINE_STATUS, VALID_STATUS, VALIDATING_STATUS} from "common/constants";

export default class BasicForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      children: [],
      status: PRISTINE_STATUS
    };

    this.validateAll = debounce(this.validateAll.bind(this), 3000);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    return this.fetchFormDefinition("basic");
  }

  addCustomProps(data) {
    return {
      children: data.formDef.children.map((c) => {
        return {value: "", errors: [], rules: [], status: "pristine", ...c};
      })
    };
  }

  fetchFormDefinition(formId) {
    return fetch(`/api/getFormDefinition/${formId}`)
      .then(res => res.json())
      .then(this.addCustomProps)
      .then(this.setState.bind(this));
  }

  validateAll() {
    // TODO: should only validate the child, then after promise:
    // validate the section by checking each child errors length => update status and therefore submit button
    // eslint-disable-next-line no-console
    console.log("This method has a debounce");
    const updatedChildren = this.state.children
      .map((child) => JSON.parse(JSON.stringify(child)))
      .map((child) => {
        child.errors = child.rules
          .map((rule) => validateForRule(child, rule))
          .filter((err) => err != null);
        return child;
      });
    // eslint-disable-next-line no-console
    console.log(updatedChildren);
    
    this.setState({children: updatedChildren, status: VALID_STATUS});
  }

  handleInputChange(childIndex, event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const child = {...this.state.children[childIndex], value: value, status: VALIDATING_STATUS};
    this.setState(prevState => ({
      children: tap(prevState.children, (children) => children.splice(childIndex, 1, child)),
      status: VALIDATING_STATUS
    }), this.validateAll);
  }

  handleSubmit(event) {
    // eslint-disable-next-line no-console
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    const { children, status } = this.state;
    return (
      <div>
        <h3>List of input types</h3>
        <div>{children.length && 
          <form onSubmit={this.handleSubmit}>
            {children.map((child, index) => (
              <FormElement key={index} handleInputChange={this.handleInputChange.bind(this, index)} {...child} />
            ))}
            <input type="submit" value="Submit" disabled={status !== VALID_STATUS} />
            {
              status == VALIDATING_STATUS && 
              <span>Validation in progress...</span>
            }
          </form>
        }</div>
      </div>
    );
  }
}

BasicForm.propTypes = {
  children: PropTypes.array
};