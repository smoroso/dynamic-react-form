"use strict";

import React from "react";
import PropTypes from "prop-types";
import FormElement from "common/containers/FormElement";
import {tap} from "common/utils";
import {validateForRule} from "common/validations";
import {INVALID_STATUS, PRISTINE_STATUS, VALID_STATUS, VALIDATING_STATUS } from "common/constants";
import {decorateChildDef} from "common/services/decoratorService";

export default class FormSection extends React.Component {
  constructor(props) {
    super(props);

    const originalChildren = JSON.parse(JSON.stringify(props.formChildren.map(decorateChildDef)));
    this.state = {
      children: originalChildren,
      status: props.status || PRISTINE_STATUS
    };

    this.handleInputChange = (props.handleInputChange && props.handleInputChange.bind(this)) || this.handleInputChange.bind(this);
    this.handleBackClick = props.handleBackClick && props.handleBackClick.bind(this);
    this.handleNextClick = props.handleNextClick && props.handleNextClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this, JSON.parse(JSON.stringify(originalChildren)));
    this.handleSubmitClick = (props.handleSubmitClick && props.handleSubmitClick.bind(this)) || this.handleSubmitClick.bind(this);
    this.validateChildThenSection = this.validateChildThenSection.bind(this);
  }

  validateChild(child) {
    return child.rules
      .map((rule) => validateForRule(child, rule))
      .filter((err) => err != null);
  }

  validateChildThenSection(childIndex, child) {
    // TODO: Make it asynchronous?
    const childClone = JSON.parse(JSON.stringify(child));
    childClone.errors = this.validateChild(childClone);
    childClone.status = childClone.errors.length === 0 ? VALID_STATUS : INVALID_STATUS;
    const updatedChildren = tap(this.state.children, (children) => children.splice(childIndex, 1, childClone));
    const newStatus = updatedChildren.flatMap(this.validateChild).length === 0 ? VALID_STATUS : INVALID_STATUS;

    this.setState({
      children: updatedChildren,
      status: newStatus
    });
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

    const nextOrSubmitName = step === (stepsNumber - 1) ? "Submit" : "Next";
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
              <button type="button" value="button" onClick={(e) => this.handleBackClick(e, children)}>Back</button>
            }
            <button type="button" value={nextOrSubmitName} disabled={status !== VALID_STATUS} onClick={(e) => nextOrSubmitFn(e, children)}>
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