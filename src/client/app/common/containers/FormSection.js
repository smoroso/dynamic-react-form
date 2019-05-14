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

    const originalChildren = JSON.parse(JSON.stringify(props.formChildren));
    this.state = {
      children: originalChildren,
      status: props.status || PRISTINE_STATUS
    };

    this.handleInputChange = (props.handleInputChange && props.handleInputChange.bind(this)) || this.handleInputChange.bind(this);
    this.handleBackClick = props.handleBackClick && props.handleBackClick.bind(this);
    this.handleNextClick = props.handleNextClick && props.handleNextClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this, JSON.parse(JSON.stringify(originalChildren)));
    this.handleSubmitClick = (props.handleSubmitClick && props.handleSubmitClick.bind(this)) || this.handleSubmitClick.bind(this);
    this.validateChildThenSection = debounce(this.validateChildThenSection.bind(this), 1000);
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
      children: tap(prevState.children, (children) => children.splice(childIndex, 1, child)),
      status: VALIDATING_STATUS
    }), this.validateChildThenSection.bind(this, childIndex, child));
  }

  handleResetClick(originalChildren, event) {
    this.setState({children: originalChildren, status: PRISTINE_STATUS});
    event.preventDefault();
  }

  handleSubmitClick(event) {
    // eslint-disable-next-line no-console
    console.log("This is the default submit method if none was provided");
    event.preventDefault();
  }

  render() {
    const { children, status } = this.state;
    const {step, stepsNumber} = this.props;

    const nextOrSubmitName = step === (stepsNumber - 1) ? "Submit" : "Name";
    const nextOrSubmitFn = step === (stepsNumber - 1) ? this.handleSubmitClick : this.handleNextClick;

    return (
      <div>
        <h3>List of input types</h3>
        <div>{children.length && 
          <div>
            {children.map((child, index) => (
              <FormElement key={index} handleInputChange={this.handleInputChange.bind(this, index)} {...child} />
            ))}
            <button type="button" value="Reset" disabled={![VALID_STATUS, INVALID_STATUS].includes(status)} onClick={this.handleResetClick}>Reset</button>
            {
              step > 0 &&
              <button type="button" value="button" onClick={this.handleBackClick}>Back</button>
            }
            <button type="button" value={nextOrSubmitName} disabled={status !== VALID_STATUS} onClick={nextOrSubmitFn}>
              { status == VALIDATING_STATUS ? "Validating..." : nextOrSubmitName }
            </button>
          </div>
        }</div>
      </div>
    );
  }
}

FormSection.propTypes = {
  formChildren: PropTypes.array.isRequired,
  status: PropTypes.string,
  step: PropTypes.number,
  stepsNumber: PropTypes.number,
  handleInputChange: PropTypes.func,
  handleBackClick: PropTypes.func,
  handleNextClick: PropTypes.func,
  handleSubmitClick: PropTypes.func
};