"use strict";

import React from "react";
import PropTypes from "prop-types";

import Required from "common/components/form_elements/Required";
import Checkbox from "common/components/form_elements/Checkbox";
import Input from "common/components/form_elements/Input";
import Radio from "common/components/form_elements/Radio";
import Select from "common/components/form_elements/Select";

const stringToComponentMapper = () => {
  return {
    checkbox: Checkbox,
    date: Input,
    email: Input,
    text: Input,
    radio: Radio,
    select: Select
  };
};

const stringToComponentObj = stringToComponentMapper();

class FormElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const comp = stringToComponentObj[this.props.type];
    // TODO: HOC for rendering the error messages for every input and maybe also the customProps for each input(child) def
    return (
      <div>
        <span>{this.props.label}<Required rules={this.props.rules} /></span>
        {comp(this.props)}
      </div>
    );
  }
}

FormElement.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rules: PropTypes.array
};

export default FormElement;
