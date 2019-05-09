"use strict";

import React from "react";
import PropTypes from "prop-types";
import FormElement from "common/containers/FormElement";
import {debounce, tap} from "common/utils";
import {validateForRule} from "common/validations";
import {INVALID_STATUS, PRISTINE_STATUS, VALID_STATUS, VALIDATING_STATUS } from "common/constants";

export default class FormSection extends React.Component {
  constructor(props) {
    super(props);

    const childrenWithCustomProps = this.addCustomProps(props.formChildren);
    this.state = {
      children: childrenWithCustomProps,
      status: props.status || PRISTINE_STATUS
    };

    this.validateChildThenSection = debounce(this.validateChildThenSection.bind(this), 1000);
    this.handleSubmitClick = props.handleSubmitClick || this.handleSubmitClick.bind(this);
  }

  addCustomProps(children) {
    return children.map((c) => {
      return {value: "", errors: [], rules: [], status: PRISTINE_STATUS, ...c};
    });
  }

  validateChildThenSection(childIndex, child) {
    // TODO: Make it asynchronous?
    const childClone = JSON.parse(JSON.stringify(child));
    childClone.errors = childClone.rules
      .map((rule) => validateForRule(childClone, rule))
      .filter((err) => err != null);

    childClone.status = childClone.errors.length === 0 ? VALID_STATUS : INVALID_STATUS;
    const newStatus = [...this.state.children, childClone].every((child) => child.errors.length === 0) ? VALID_STATUS : INVALID_STATUS;

    this.setState(prevState => ({
      children: tap(prevState.children, (children) => children.splice(childIndex, 1, childClone)),
      status: newStatus
    }));
  }

  handleInputChange(childIndex, event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const child = {...this.state.children[childIndex], value: value, status: VALIDATING_STATUS};
    this.setState(prevState => ({
      children: tap(prevState.children, (children) => children.splice(childIndex, 1, child))
    }), this.validateChildThenSection.bind(this, childIndex, child));
  }

  handleSubmitClick(event) {
    // eslint-disable-next-line no-console
    console.log("This is the default submit method if none was provided");
    event.preventDefault();
  }

  render() {
    const { children, status } = this.state;
    return (
      <div>
        <h3>List of input types</h3>
        <div>{children.length && 
          <div>
            {children.map((child, index) => (
              <FormElement key={index} handleInputChange={this.handleInputChange.bind(this, index)} {...child} />
            ))}
            {/* TODO: Cancel button */}
            <button type="submit" value="Submit" disabled={status !== VALID_STATUS} onClick={this.handleSubmitClick}>Submit</button>
            {
              status == VALIDATING_STATUS && 
              <span>Validation in progress...</span>
            }
          </div>
        }</div>
      </div>
    );
  }
}

FormSection.propTypes = {
  formChildren: PropTypes.array.isRequired,
  status: PropTypes.string,
  handleSubmitClick: PropTypes.func
};