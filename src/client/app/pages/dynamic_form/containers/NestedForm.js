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
  }


  componentDidMount() {
    return fetchFormDefinition("nested")
      .then(this.setState.bind(this));
  }

  render() {
    const { steps } = this.state;
    return (
      <div>
        {
          steps.length && 
          <NestedForm steps={steps}/>
        }
      </div>
    );
  }
}

NestedFormExample.propTypes = {
  steps: PropTypes.array
};

export default NestedFormExample;