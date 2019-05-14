"use strict";

import React from "react";
import PropTypes from "prop-types";
import Collapsible from "common/containers/Collapsible";
import FormSection from "common/containers/FormSection";

class NestedForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handleBackClick(/*event*/) {
    // Only to the parent
    // eslint-disable-next-line no-console
    console.log("What should I do?");
  }

  handleNextClick(/*event*/) {
    // Only to the parent
    // eslint-disable-next-line no-console
    console.log("What should I do?");
  }

  render() {
    const { steps } = this.props;
    return (
      <div>
        {steps.length && steps.map((step, index) => (
          <Collapsible key={index} title={step.name}>
            <FormSection
              formChildren={step.children}
              handleBackClick={this.handleBackClick}
              handleNextClick={this.handleNextClick}
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
  steps: PropTypes.array
};

export default NestedForm;
