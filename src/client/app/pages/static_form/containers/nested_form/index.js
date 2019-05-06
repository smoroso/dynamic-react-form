"use strict";

import React from "react";
import FirstStep from "pages/static_form/containers/nested_form/first_step.js";
import SecondStep from "pages/static_form/containers/nested_form/second_step.js";
import ThirdStep from "pages/static_form/containers/nested_form/third_step.js";

class NestedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        {
          title: "LOL1",
          isValid: false
        },
        {
          title: "LOL2",
          isValid: false
        },
        {
          title: "LOL3",
          isValid: false
        }
      ]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert("Your favorite flavor is: " + this.state.favFlavor);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FirstStep def={this.state.steps[0]}></FirstStep>
        <SecondStep def={this.state.steps[1]}></SecondStep>
        <ThirdStep def={this.state.steps[2]}></ThirdStep>
      </form>
    );
  }
}

export default NestedForm;
