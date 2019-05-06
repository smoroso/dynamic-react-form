"use strict";

import React from "react";
import PropTypes from "prop-types";
import NestedFormCont from "common/containers/NestedForm";

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
      favFlavor: "coconut"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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
      <NestedFormCont collapsibleTitle={this.props.def.title}>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Pick your favorite flavor:
          <select name="favFlavor" value={this.state.favFlavor} onChange={this.handleInputChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <button>Cancel</button>
        <button>Next</button>
      </NestedFormCont>
    );
  }
}

FirstStep.propTypes = {
  def: PropTypes.object
};

export default FirstStep;