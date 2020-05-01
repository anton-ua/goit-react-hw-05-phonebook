import React, { Component } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styles from "./ContactsList.module.css";
import TransitionListItem from "../../Transition/TransitionListItem.module.css";

export default class ContactsList extends Component {
  render() {
    const { contacts } = this.props;

    return (
      <TransitionGroup component="ul">
        {contacts.map(({ name, number, id }) => (
          <CSSTransition
            timeout={250}
            unmountOnExit
            key={id}
            classNames={TransitionListItem}
          >
            <li>
              <p>
                {name}: <span>{number}</span>
                <button
                  type="button"
                  onClick={() => this.props.deleteContact(id)}
                  className={styles.button}
                >
                  X
                </button>
              </p>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
}

ContactsList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
