import React, { Component } from "react";
import "./MainContent.scss";
import "./Dashboard.scss";

import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Dashboard extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    stock: "",
    members: [],
    id: "",
    owner: {},
    
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false });
  };

  toggleEditModal = (name,stock,action, stockquantity , startingprice , stoploss , targetprice , reasonfortrade , closingprice , reasonforexit , emotionalstate, members, id, owner, e) => {
    e.stopPropagation();

    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      stock: stock,
      action: action,
      stockquantity: stockquantity,
      startingprice: startingprice,
      stoploss: stoploss,
      targetprice: targetprice,
      reasonfortrade: reasonfortrade,
      closingprice: closingprice,
      reasonforexit: reasonforexit,
      emotionalstate: emotionalstate,
      members: members,
      id: id,
      owner: owner
      
    });
  };

  render() {
    const { journals } = this.props.journals;

    let content;

    let journalData = journals.sort().map(journal => (
      <div
        key={journal._id}
        className="journal-icon"
        onClick={() => this.props.history.push(`/journals/${journal._id}`)}
      >
        <div className="journal-stock">{journal.stock}</div>
        <div
          className="journal-info-button"
          onClick={this.toggleEditModal.bind(
            this,
            journal.name,
            journal.stock,
            journal.action,
            journal.stockquantity, 
            journal.startingprice,
            journal.stoploss,
            journal.targetprice, 
            journal.reasonfortrade,
            journal.closingprice,
            journal.reasonforexit,
            journal.emotionalstate,
            journal.teamMembers,
            journal._id,
            journal.owner,
           
          )}
        >
          Edit journal
        </div>
        <div className="journal-info-button">Go to journal</div>
      </div>
    ));

    if (journals.length > 0) {
      // At least one journal
      content = (
        <>
          <button className="main-btn" onClick={this.toggleModal}>
            Create another trade
          </button>
          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              name={this.state.name}
              members={this.state.members}
              id={this.state.id}
              owner={this.state.owner}
              stock={this.state.stock}
              action={this.state.action}
              stockquantity={this.state.stockquantity}
              startingprice={this.state.startingprice}
              stoploss={this.state.stoploss}
              targetprice={this.state.targetprice}
              reasonfortrade={this.state.reasonfortrade}
              closingprice={this.state.closingprice}
              reasonforexit={this.state.reasonforexit}
              emotionalstate={this.state.emotionalstate}
            />
          </div>
          <div className="journals-wrapper">{journalData}</div>
        </>
      );
    } else {
      // No journals
      content = (
        <>
          <div className="journals">
            <div className="no-journals">
              <h1 className="header">You have no trades</h1>
              <button className="main-btn" onClick={this.toggleModal}>
                Enter your first trade
              </button>
              <div className="modal-wrapper">
                <Modal onClose={this.toggleModal} modal={this.state.modal} />
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="main-content">
        <h1 className="header">Your Open Trades</h1>
        {content}
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
)(Dashboard);
