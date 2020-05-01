import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import TransitionFilter from "../../Transition/TransitionFilter.module.css";

export default class Filter extends Component {
  handleFilter = ({ target }) => {
    const { value } = target;

    this.props.filterValue(value);
  };

  render() {
    return (
      <CSSTransition
        classNames={TransitionFilter}
        timeout={250}
        unmountOnExit
        in={this.props.isFilter}
      >
        <div>
          <p>Find contact by name:</p>
          <input
            placeholder="Find..."
            value={this.props.filter}
            onChange={this.handleFilter}
          />
        </div>
      </CSSTransition>
    );
  }
}

Filter.propTypes = {
  filterValue: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  isFilter: PropTypes.bool.isRequired,
};
