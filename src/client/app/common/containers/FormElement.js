"use strict";

import React from "react";
import PropTypes from "prop-types";

import Input from "common/components/form_elements/Input";
import Radio from "common/components/form_elements/Radio";
import Select from "common/components/form_elements/Select";

const stringToComponentMapper = {
  checkbox: Input,
  date: Input,
  email: Input,
  text: Input,
  radio: Radio,
  select: Select
};

class FormElement extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const comp = stringToComponentMapper[this.props.type];
    // TODO: HOC for rendering the error messages for every input and maybe also the customProps for each input(child) def
    return (
      comp(this.props)
    );
  }
}

FormElement.propTypes = {
  type: PropTypes.string.isRequired
};

export default FormElement;
