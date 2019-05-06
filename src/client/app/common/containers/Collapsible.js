"use strict";

import React from "react";
import PropTypes from "prop-types";

class Collapsible extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(/*e*/){
    this.setState({open: !this.state.open});
  }

  componentDidUpdate(){
    // this.props.onToggle(this.props.index);
  }

  render() {
    //   togglable={this.props.toggleCondition}
    return (
      <div>
        <div onClick={(e)=>this.togglePanel(e)}>{this.props.title}</div>
        {this.state.open && 
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
  children: PropTypes.any.isRequired
};

export default Collapsible;