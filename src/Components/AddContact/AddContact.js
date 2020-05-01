import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./AddContact.module.css";
import { CSSTransition } from "react-transition-group";
import TransitionLogo from "../../Transition/TransitionLogo.module.css";

const InitialState = { name: "", number: "" };

export default class AddContact extends Component {
  state = { ...InitialState, isLogo: false };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.name) {
      return;
    }

    if (!this.state.number) {
      return;
    }

    this.props.onAddContact({ ...this.state });

    this.reset();
  };

  reset = () => {
    this.setState({ ...InitialState });
  };

  componentDidMount() {
    this.setState({ isLogo: true });
  }

  render() {
    return (
      <>
        <CSSTransition
          in={this.state.isLogo}
          classNames={TransitionLogo}
          timeout={500}
          unmountOnExit
        >
          <h2>Phonebook</h2>
        </CSSTransition>
        <form onSubmit={this.handleSubmit}>
          <label name="name">
            Name
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label name="number">
            Number
            <input
              type="text"
              placeholder="Enter phone number"
              name="number"
              value={this.state.number}
              onChange={this.handleChange}
            />
          </label>
          <button className={styles.buttonAdd} type="submit">
            Add Contact
          </button>
        </form>
      </>
    );
  }
}

AddContact.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
