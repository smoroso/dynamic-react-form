"use strict";

import React from "react";
import PropTypes from "prop-types";

class Collapsible extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: this.props.open
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(event){
    if(!this.props.clickable) return;
    this.setState({open: !this.state.open});
    event.preventDefault();
  }

  componentWillUpdate(nextProps, nextState) {
    if(!nextProps.clickable || nextProps.open === this.state.open || nextProps.open === nextState.open) return;
    this.setState({open: nextProps.open});
  }

  render() {
    const {open} = this.state;
    return (
      <div>
        <div onClick={this.togglePanel}>{this.props.title}</div>
        Clickable: {this.props.clickable.toString()}
        {open && 
          <div>
            {this.props.children}
          </div>
        }
      </div>
    );
  }
}

Collapsible.propTypes = {
  title: PropTypes.string.isRequired,
  clickable: PropTypes.bool,
  open: PropTypes.bool,
  children: PropTypes.any.isRequired
};

export default Collapsible;