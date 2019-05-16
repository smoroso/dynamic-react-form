"use strict";

import React from "react";
import PropTypes from "prop-types";
import styles from "common/containers/collapsible.scss";

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
      <div className={styles.collapsible}>
        <button
          onClick={this.togglePanel}
          disabled={!this.props.clickable}
          data-active={open}
        >{this.props.title}</button>
        {open && this.props.children}
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