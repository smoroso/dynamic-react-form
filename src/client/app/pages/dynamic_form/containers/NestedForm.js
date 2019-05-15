"use strict";

import React from "react";
import PropTypes from "prop-types";
import NestedForm from "common/containers/NestedForm";
import {fetchFormDefinition} from "common/services/fetcherService";

class NestedFormExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      steps: []
    };

    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    return this.resetForm();
  }

  resetForm() {
    this.setState({steps:[]});
    
    return fetchFormDefinition("nested")
      .then(this.setState.bind(this));
  }

  render() {
    const { steps } = this.state;
    return (
      <div>
        {
          steps.length && 
          <NestedForm steps={steps} handleResetClick={this.resetForm}/>
        }
      </div>
    );
  }
}

NestedFormExample.propTypes = {
  steps: PropTypes.array
};

export default NestedFormExample;