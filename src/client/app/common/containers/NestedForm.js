"use strict";

import React from "react";
import PropTypes from "prop-types";
import Collapsible from "common/containers/Collapsible";
import FormSection from "common/containers/FormSection";
import {tap} from "common/utils";
import {VALID_STATUS} from "common/constants";
import {decorateStep} from "common/services/decoratorService";
import styles from "common/containers/form.scss";

class NestedForm extends React.Component {
  constructor(props) {
    super(props);

    const customSteps = this.props.steps.map(decorateStep);
    this.state = {
      steps: customSteps
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleBackClick(stepIndex, event, children) {
    // Only to the parent
    // eslint-disable-next-line no-console
    console.log("Back! Retreeeeeat!");
    event.preventDefault();
    const currentStep = {...this.state.steps[stepIndex], open: false, children: children};
    const backStep = {...this.state.steps[stepIndex-1], clickable: true, open: true};
    this.setState(prevState => ({
      steps: tap(prevState.steps, (steps) => steps.splice(stepIndex-1, 2, backStep, currentStep))
    }));
  }

  handleNextClick(stepIndex, event, children) {
    // Only to the parent
    // eslint-disable-next-line no-console
    console.log("Neeeeeeeeeeeext!");
    // TODO: Some edge cases makes me lose data: Like toggling back instead of clicking on back, then toggling next.
    // => i.e. Not using the back/next inputs
    event.preventDefault();
    const currentStep = {...this.state.steps[stepIndex], status: VALID_STATUS, open: false, children: children};
    const nextStep = {...this.state.steps[stepIndex+1], clickable: true, open: true};
    this.setState(prevState => ({
      steps: tap(prevState.steps, (steps) => steps.splice(stepIndex, 2, currentStep, nextStep))
    }));
  }

  handleSubmitClick(e, children) {
    e.preventDefault();
    const currentStep = {...this.state.steps[this.state.steps.length - 1], status: VALID_STATUS, open: false, children: children};
    this.setState(prevState => ({
      steps: tap(prevState.steps, (steps) => steps.splice(-1, 1, currentStep))
    }));
    // eslint-disable-next-line no-console
    console.log(this.state);
  }

  render() {
    const {steps} = this.state;
    const {handleResetClick} = this.props;

    return (
      <div className={styles.form}>
        {steps.length && steps.map((step, index) => (
          <Collapsible key={index} title={step.label} clickable={step.clickable} open={step.open}>
            <FormSection
              formChildren={step.children}
              status={step.status}
              handleBackClick={this.handleBackClick.bind(this, index)}
              handleNextClick={this.handleNextClick.bind(this, index)}
              handleResetClick={handleResetClick}
              handleSubmitClick={this.handleSubmitClick}
              step={index}
              stepsNumber={steps.length}
            />
          </Collapsible>
        ))}
      </div>
    );
  }
}

NestedForm.propTypes = {
  steps: PropTypes.array,
  handleResetClick: PropTypes.func,
  handleSubmitClick: PropTypes.func
};

export default NestedForm;
