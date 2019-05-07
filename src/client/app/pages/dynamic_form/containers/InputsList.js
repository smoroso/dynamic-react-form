"use strict";

import React from "react";
import PropTypes from "prop-types";

const FormGenerator = ({ inputs = [] }) => (
  <table>
    <tbody>
      {inputs.map(i => (
        <tr key={`section_${i.name}`}>
          <td><label>{i.label}</label></td>
          <td><input type={i.type} /></td>
        </tr>
      ))}
    </tbody>
  </table>
);
FormGenerator.propTypes = {
  inputs: PropTypes.array
};

export default class InputsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formDef: {}
    };
  }

  componentDidMount() {
    return this.fetchFormDefinition("inputs");
  }

  fetchFormDefinition(formId) {
    return fetch(`/api/getFormDefinition/${formId}`)
      .then(res => res.json())
      .then(data => this.setState({ formDef: data.formDef }));
  }

  render() {
    const { formDef } = this.state;
    return (
      <div>
        <h3>List of input types</h3>
        <div>{formDef && 
          <form>
            <FormGenerator inputs={formDef.children}/>
          </form>
        }</div>
      </div>
    );
  }
}

InputsList.propTypes = {
  children: PropTypes.array
};