import React, { Component } from "react";
import styles from "./Alert.module.css";
import { CSSTransition } from "react-transition-group";
import TransitionAlert from "../../Transition/TransitionAlert.module.css";
import PropTypes from "prop-types";

export default class Alert extends Component {
  render() {
    return (
      <CSSTransition
        in={this.props.isAlert}
        timeout={250}
        unmountOnExit
        classNames={TransitionAlert}
      >
        <div className={styles.alert}>Contact is already exist!</div>
      </CSSTransition>
    );
  }
}

Alert.propTypes = {
  isAlert: PropTypes.bool.isRequired,
};
