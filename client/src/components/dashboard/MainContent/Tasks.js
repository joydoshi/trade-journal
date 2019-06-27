import React, { Component } from "react";
import "./MainContent.scss";
import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Tasks extends Component {
  state = {
    modal: false
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { journals } = this.props.journals;

    return (
      <div className="main-content">
        <h1 className="header">Your Tasks</h1>
        <div className="journals">
          <div className="no-journals">
            <h1 className="header">You have no tasks</h1>
            {journals.length > 0 ? (
              <p>Visit a journal to create your first task</p>
            ) : (
              <button className="main-btn" onClick={this.toggleModal}>
                Create your first journal
              </button>
            )}
            <Modal onClose={this.toggleModal} modal={this.state.modal} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  journals: state.journals
});

export default connect(
  mapStateToProps,
  {}
)(Tasks);
