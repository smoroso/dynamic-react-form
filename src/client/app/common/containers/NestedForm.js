"use strict";

import React from "react";
import PropTypes from "prop-types";
import Collapsible from "common/containers/Collapsible";
import FormSection from "common/containers/FormSection";

class NestedForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      steps: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
    const { steps } = this.state;
    return (
      <div>
        {steps.length && steps.map((step, index) => (
          <Collapsible key={index} title={step.name}>
            <FormSection
              formChildren={step.children}
              handleBackClick={this.handleBackClick}
              handleNextClick={this.handleNextClick}
            />
          </Collapsible>
        ))}
      </div>
    );
  }
}

NestedForm.propTypes = {
  toggleCondition: PropTypes.func,
  collapsibleTitle: PropTypes.string.isRequired,
  children: PropTypes.any
};

export default NestedForm;
