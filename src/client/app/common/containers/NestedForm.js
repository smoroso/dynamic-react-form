"use strict";

import React from "react";
import PropTypes from "prop-types";
import Collapsible from "common/containers/Collapsible";

class NestedForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isGoing: true,
    //   numberOfGuests: 2,
    //   favFlavor: "coconut"
    // };

    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Collapsible title={this.props.collapsibleTitle}>
        {this.props.children}
      </Collapsible>
    );
  }
}

NestedForm.propTypes = {
  toggleCondition: PropTypes.func,
  collapsibleTitle: PropTypes.string.isRequired,
  children: PropTypes.any
};

export default NestedForm;
