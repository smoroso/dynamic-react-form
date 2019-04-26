"use strict";

import React from "react";

class BasicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // eslint-disable-next-line no-console
    console.log(this.state);
    event.preventDefault();
  }

  isValid() {
    if(this.state.confirmPassword === this.state.password) {
      return true;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Personal information:</legend>
          <label>
            Firstname:
            <input
              name="firstname"
              type="text"
              value={this.state.firstname}
              onChange={this.handleInputChange}
              required={!!this.state.lastname} />
          </label>
          <label>
            Lastname:
            <input
              name="lastname"
              type="text"
              value={this.state.lastname}
              onChange={this.handleInputChange}
              required={!!this.state.firstname} />
          </label>
        </fieldset>
        <fieldset>
          <legend>Credentials:</legend>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Confirm:
            <input
              name="confirmPassword"
              type="password"
              value={this.state.confirmPassword}
              pattern={this.state.password}
              onChange={this.handleInputChange} />
          </label>
        </fieldset>
        <input type="submit" value="Submit" disabled={!this.isValid()} />
      </form>
    );
  }
}

export default BasicForm;
