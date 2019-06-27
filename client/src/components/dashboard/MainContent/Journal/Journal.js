import React, { Component } from "react";
import { connect } from "react-redux";
import { getJournal } from "../../../../actions/journalsActions";
import { getTasks } from "../../../../actions/taskActions";

import Spinner from "../../../common/Spinner";
import Modal from "../Modal/Modal";

import "../MainContent.scss";
import "./Journal.scss";

class Journal extends Component {
  state = {
    modal: false,
    edit: false,
    editTask: false,
    task: false,
    name: "",
    members: [],
    id: "",
    owner: {},
    tasks: [],
    date: "",
    stock: "",
    action: "",
    stockquantity: "", 
    startingprice: "",
    stoploss: "",
    targetprice: "",
    reasonfortrade: "",
    closingprice: "",
    reasonforexit: "",
    emotionalstate: "",
    errors: {}
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false, task: false });
  };

  toggleEditModal = (name, stock, action,  stockquantity, startingprice, stoploss, targetprice, reasonfortrade,closingprice,reasonforexit,emotionalstate,members, id, owner, e) => {
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

  toggleTaskModal = e => {
    this.setState({
      modal: !this.state.modal,
      task: !this.state.task
    });
  };

  toggleEditTaskModal = e => {
    this.setState({
      modal: !this.state.modal,
      editTask: !this.state.editTask
    });
  };

  componentDidMount() {
    this.props.getJournal(this.props.match.params.journal);
    this.props.getTasks(this.props.match.params.journal);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.journal !== prevProps.match.params.journal) {
      this.props.getJournal(this.props.match.params.journal);
      this.props.getTasks(this.props.match.params.journal);
    }
  }

  onChange = async e => {
    await this.setState({ tasks: this.props.tasks.tasks });

    let tasks = await [...this.state.tasks];

    await alert(tasks[e.target.id].taskName);

    tasks[e.target.id].taskName = await e.target.value;

    await this.setState({ tasks });
  };

  render() {
    const { errors } = this.state;
    const { tasks } = this.props.tasks;

    let tasksList = tasks.map((task, index) => (
      <div className="task-input" key={index}>
        <i className="material-icons" onClick={() => alert("TODO")}>
          check_circle
        </i>
        <input
          type="text"
          name="task"
          id={index}
          value={task.taskName}
          onChange={this.onChange}
          className="journal-task"
        />
        <span className={!task.assignee ? "task-info muted" : "task-info"}>
          {task.assignee === this.props.auth.user.email
            ? "You"
            : task.assignee || "Unassigned"}
        </span>
        <span
          className={
            task.dateDue === "Date undefined" ? "task-info muted" : "task-info"
          }
        >
          {task.dateDue === "Date undefined" ? "Not Set" : task.dateDue}
        </span>
      </div>
    ));

    if (
      this.props.journal &&
//      this.props.journal.teamMembers &&
      !this.props.journals.journalLoading &&
      !this.props.tasks.tasksLoading
    ) {
      const { journal } = this.props;

      return (
        <div className="main-content">
          <h1 className="journal-header">{journal.name}</h1>
          <button
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
              journal.owner
            )}
            className="main-btn center-btn"
          >
            Edit Journal Info
          </button>

          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              task={this.state.task}
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
          <div className="tasks-container">
            <div className="journals-first-row">
              <button
                className="main-btn add-btn"
                onClick={this.toggleTaskModal}
              >
                Add task
              </button>
              <div className="journals-column-headers">
                <p>Assignee</p>
                <p>Due</p>
              </div>
            </div>
            <div className="journal-tasks">{tasksList}</div>
          </div>
        </div>
      );
    }

    return (
      <div className="journal-spinner">
        <Spinner />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  journal: state.journals.journal,
  journals: state.journals,
  tasks: state.tasks,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getJournal, getTasks }
)(Journal);
