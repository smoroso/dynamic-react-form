"use strict";

import React from "react";
import PropTypes from "prop-types";

const FormGenerator = ({ sections = [] }) => (
  <div>
    {sections.map(s => (
      <div key={`section_${s.name}`}>
        <h3>{s.caption}</h3>
        {/* <FormSection name={s.name} component="div">
          <Row>
            {s.fields.map(f => (
              <Col md={6} key={f.name}>
                <Field
                  name={f.name}
                  component={stringToComponentMapper[f.component]}
                  label={f.label}
                />
              </Col>
            ))}
          </Row>
        </FormSection> */}
      </div>
    ))}
  </div>
);
FormGenerator.propTypes = {
  sections: PropTypes.array
};

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formDef: {}
    };
  }

  componentDidMount() {
    const {match} = this.props;
    return this.fetchFormDefinition(match.params.id);
  }

  fetchFormDefinition(formId) {
    return fetch(`/api/getFormDefinition/${formId}`)
      .then(res => res.json())
      .then(data => this.setState({ formDef: data.formDef }));
  }

  render() {
    const { match } = this.props;
    const { formDef } = this.state;
    return (
      <div>
        <h3>Form for: {match.params.id}</h3>
        <div>{formDef && 
          <form>
            <button
              onClick={this.handleFormSubmit}
              className="btn btn-primary">
              Save
            </button>
            &nbsp;
            <button
              onClick={this.handleCancel}
              className="btn btn-default">
              Cancel
            </button>
          </form>
        }</div>
      </div>
    );
  }
}

Form.propTypes = {
  match: PropTypes.object
};


