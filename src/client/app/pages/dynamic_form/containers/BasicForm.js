"use strict";

import React from "react";
import PropTypes from "prop-types";
import FormSection from "common/containers/FormSection";
import {fetchFormDefinition} from "common/services/fetcherService";

export default class BasicForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      children: []
    };
  }

  componentDidMount() {
    return fetchFormDefinition("basic")
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
        {
          children.length && 
          <FormSection
            formChildren={children}
            handleSubmitClick={this.handleSubmitClick}
            step={0}
            stepsNumber={1}
          />
        }
      </div>
    );
  }
}

BasicForm.propTypes = {
  children: PropTypes.array
};