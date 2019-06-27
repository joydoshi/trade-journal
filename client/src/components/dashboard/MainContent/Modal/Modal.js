import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createJournal,
  updateJournal,
  deleteJournal
} from "../../../../actions/journalsActions";
import { createTask } from "../../../../actions/taskActions";
import isEmpty from "is-empty";
import moment from "moment";

import "./Modal.scss";

class Modal extends Component {
  state = {
    journalName: "",
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
    members: [{ name: "", email: "" }],
    taskName: "",
    assignee: "",
    monthDue: "",
    dayDue: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        journalName: nextProps.name,
        stock:nextProps.stock,
        action:nextProps.action,
        stockquantity:nextProps.stockquantity,
        startingprice:nextProps.startingprice,
        stoploss:nextProps.stoploss,
        targetprice:nextProps.targetprice,
        reasonfortrade:nextProps.reasonfortrade,
        closingprice:nextProps.closingprice,
        reasonforexit:nextProps.reasonforexit,
        emotionalstate:nextProps.emotionalstate,
        members: nextProps.members
      });
    }
  }

  onChange = e => {
    if (["name", "email"].includes(e.target.name)) {
      let members = [...this.state.members];
      members[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({ members });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  };

  addMember = e => {
    this.setState(prevState => ({
      members: [...prevState.members, { name: "", email: "" }]
    }));
  };

  deleteMember = index => {
    let array = [...this.state.members];
    array.splice(index, 1);
    this.setState({ members: array });
  };

  createJournal = () => {
    let journal = {
      journalName: this.state.journalName,
      stock: this.state.stock,
      action: this.state.action,
      stockquantity: this.state.stockquantity,
      startingprice: this.state.startingprice,
      stoploss: this.state.stoploss,
      targetprice: this.state.targetprice,
      reasonfortrade: this.state.reasonfortrade,
      closingprice: this.state.closingprice,
      reasonforexit: this.state.reasonforexit,
      emotionalstate: this.state.emotionalstate,
      members: this.state.members
    };

    this.props.createJournal(journal);
  console.log(this.props.errors)
    //console.debug("gjhjh");
    if(isEmpty(this.props.errors))
    {this.onClose();}
  };

  updateJournal = async id => {
    let journal = {
      id: this.props.id,
      journalName: this.state.journalName,
      stock: this.state.stock,
      action: this.state.action,
      stockquantity: this.state.stockquantity,
      startingprice: this.state.startingprice,
      stoploss: this.state.stoploss,
      targetprice: this.state.targetprice,
      reasonfortrade: this.state.reasonfortrade,
      closingprice: this.state.closingprice,
      reasonforexit: this.state.reasonforexit,
      emotionalstate: this.state.emotionalstate,
      members: this.state.members
    };

    await this.props.updateJournal(journal);

    this.onClose();
  };

  deleteJournal = id => {
    this.props.deleteJournal(id);
    this.onClose();
  };

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
    this.setState({
      journalName: "",
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
      taskName: "",
      assignee: "",
      monthDue: "",
      dayDue: "",
      members: [{ name: "", email: "" }]
    });
  };

  onSelectChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  createTask = e => {
    e.preventDefault();

    let fullDate =
      this.state.monthDue +
      "-" +
      this.state.dayDue +
      "-" +
      Date().split(" ")[3];

    let momentDate = moment(fullDate, "MM-DD-YYYY")
      ._d.toString()
      .split(" ");

    let finalDate = momentDate[1] + " " + momentDate[2];

    const data = {
      journal: this.props.journals.journal._id,
      taskName: this.state.taskName,
      assignee: this.state.assignee,
      dateDue: finalDate
    };

    this.props.createTask(data);

    this.onClose();
  };

  render() {
    const { errors } = this.state;
    //console.debug(errors.stock);
    if (!this.props.modal) {
      return null;
    }

    console.log(this.props)
    document.onkeyup = e => {
      if (e.keyCode === 27 && this.props.modal) {
        this.onClose();
      }
    };

    let { members } = this.state;

    // Create task modal
    if (this.props.task) {
      const { teamMembers } = this.props.journals.journal;
      const { name, email } = this.props.auth.user;

      // Assignee dropdown in Modal
      let membersOptions = teamMembers.map((member, index) => (
        <option key={index} value={member.email}>
          {member.name}
        </option>
      ));

      // Due date dropdown in Modal
      const MONTHS = new Array(12).fill(1);
      const DAYS = new Array(31).fill(1);

      let monthsOptions = MONTHS.map((month, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      let daysOptions = DAYS.map((day, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      return (
        <form onSubmit={this.createTask} className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Create task</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Task Name (required)</div>
              <input
                required
                onChange={this.onChange}
                value={this.state.taskName}
                id="taskName"
                type="text"
                placeholder={"What is the task?"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <div className="split">
              <label>
                <div className="form-label">Assignee</div>
                <select
                  onChange={this.onSelectChange}
                  value={this.state.assignee}
                  id="assignee"
                  type="text"
                  className="form-input task-input-split"
                >
                  <option disabled value="">
                    Select a teammate
                  </option>
                  <option value={email}>{name + " (You)"}</option>
                  {membersOptions}
                </select>
              </label>
              <label>
                <div className="form-label">Due Date</div>
                <div className="split">
                  <select
                    required={this.state.dayDue ? true : false}
                    onChange={this.onSelectChange}
                    value={this.state.monthDue}
                    id="monthDue"
                    type="text"
                    className="form-input task-input-split month-due"
                  >
                    <option disabled value="">
                      Month
                    </option>
                    {monthsOptions}
                  </select>
                  <select
                    required={this.state.monthDue ? true : false}
                    onChange={this.onSelectChange}
                    value={this.state.dayDue}
                    id="dayDue"
                    type="text"
                    className="form-input task-input-split"
                  >
                    <option disabled value="">
                      Day
                    </option>
                    {daysOptions}
                  </select>
                </div>
              </label>
            </div>
          </div>
          <div>
            <button className="main-btn update-journal" type="submit">
              Create Task
            </button>
          </div>
        </form>
      );
    } else if (this.props.editTask) {
      const { teamMembers } = this.props.journals.journal;
      const { name, email } = this.props.auth.user;

      // Assignee dropdown in Modal
      let membersOptions = teamMembers.map((member, index) => (
        <option key={index} value={member.email}>
          {member.name}
        </option>
      ));

      // Due date dropdown in Modal
      const MONTHS = new Array(12).fill(1);
      const DAYS = new Array(31).fill(1);

      let monthsOptions = MONTHS.map((month, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      let daysOptions = DAYS.map((day, i) => (
        <option key={i} value={i + 1}>
          {i < 9 && "0"}
          {i + 1}
        </option>
      ));

      return (
        <form onSubmit={this.createTask} className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Edit task</h1>
          <div className="form-group">
            <label>
              <div className="form-label">Task Name (required)</div>
              <input
                required
                onChange={this.onChange}
                value={this.state.taskName}
                id="taskName"
                type="text"
                placeholder={"What is the task?"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <div className="split">
              <label>
                <div className="form-label">Assignee</div>
                <select
                  onChange={this.onSelectChange}
                  value={this.state.assignee}
                  id="assignee"
                  type="text"
                  className="form-input task-input-split"
                >
                  <option disabled value="">
                    Select a teammate
                  </option>
                  <option value={email}>{name + " (You)"}</option>
                  {membersOptions}
                </select>
              </label>
              <label>
                <div className="form-label">Due Date</div>
                <div className="split">
                  <select
                    required={this.state.dayDue ? true : false}
                    onChange={this.onSelectChange}
                    value={this.state.monthDue}
                    id="monthDue"
                    type="text"
                    className="form-input task-input-split month-due"
                  >
                    <option disabled value="">
                      Month
                    </option>
                    {monthsOptions}
                  </select>
                  <select
                    required={this.state.monthDue ? true : false}
                    onChange={this.onSelectChange}
                    value={this.state.dayDue}
                    id="dayDue"
                    type="text"
                    className="form-input task-input-split"
                  >
                    <option disabled value="">
                      Day
                    </option>
                    {daysOptions}
                  </select>
                </div>
              </label>
            </div>
          </div>
          <div>
            <button className="main-btn update-journal" type="submit">
              Create Task
            </button>
          </div>
        </form>
      );
    }

    // Edit journal modal
    else if (this.props.edit) {
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Edit Journal Info</h1>
          <p className="created-by">
            Created by {this.props.owner.name} ({this.props.owner.email})
          </p>
          <div className="form-group">
            <label>
              <div className="form-label">Journal Name (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.journalName}
                id="journalName"
                type="text"
                placeholder={"My Awesome Journal"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Stock Name (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.stock}
                error={errors.stock}
                id="stock"
                type="text"
                placeholder={"stock"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Action (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.action}
                error={errors.action}
                id="action"
                type="text"
                placeholder={"action"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">stockquantity (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.stockquantity}
                error={errors.stockquantity}
                id="stockquantity"
                type="text" 
                pattern="[0-9]*"
                placeholder={"10"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Starting Price (required) $</div>
              <input
                onChange={this.onChange}
                value={this.state.startingprice}
                error={errors.startingprice}
                id="startingprice"
                type="text"
                pattern="[0-9]*"
                placeholder={"100"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Stop Loss (required) $</div>
              <input
                onChange={this.onChange}
                value={this.state.stoploss}
                error={errors.stoploss}
                id="stoploss"
                type="text"
                pattern="[0-9]*"
                placeholder={"500"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Target Price (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.targetprice}
                error={errors.targetprice}
                id="targetprice"
                type="text"
                pattern="[0-9]*"
                placeholder={"100"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Reason for Trade</div>
              <input
                onChange={this.onChange}
                value={this.state.reasonfortrade}
                error={errors.reasonfortrade}
                id="reasonfortrade"
                type="text"
                placeholder={"reasonfortrade"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Closing Price (required) $</div>
              <input
                onChange={this.onChange}
                value={this.state.closingprice}
                error={errors.closingprice}
                id="closingprice"
                type="text"
                pattern="[0-9]*"
                placeholder={"100"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Reason for Exit</div>
              <input
                onChange={this.onChange}
                value={this.state.reasonforexit}
                error={errors.reasonforexit}
                id="reasonforexit"
                type="text"
                placeholder={"reasonforexit"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Emotional State</div>
              <input
                onChange={this.onChange}
                value={this.state.emotionalstate}
                error={errors.emotionalstate}
                id="emotionalstate"
                type="text"
                placeholder={"e.g. - Fearfull, Anxious"}
                className="form-input"
              />
            </label>
          </div>
{/*          <div className="form-label">Add team members (optional)</div>
           <button className="main-btn add-members" onClick={this.addMember}>
            Add another member
          </button>
          <div className="members-edit">
            {members.map((val, id) => {
              let memberId = `member-${id}`,
                emailId = `email-${id}`;
              return (
                <div className="split" key={id}>
                  <label className="form-label" htmlFor={memberId}>
                    Name (required for teams)
                    <input
                      type="text"
                      name="name"
                      data-id={id}
                      id={memberId}
                      value={members[id].name}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <label className="form-label split-email" htmlFor={emailId}>
                    Email (required for teams)
                    <input
                      type="text"
                      name="email"
                      data-id={id}
                      id={emailId}
                      value={members[id].email}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <span
                    className="delete"
                    onClick={this.deleteMember.bind(this, id)}
                  >
                    REMOVE
                  </span>
                </div>
              );
            })}
          </div> */}
          <div>
            <button
              className="main-btn update-journal"
              onClick={this.updateJournal.bind(this, this.props.id)}
            >
              Update Journal
            </button>
            {this.props.owner.id === this.props.auth.user.id ? ( 
              <button
                className="main-btn delete-journal"
                onClick={this.deleteJournal.bind(this, this.props.id)}
              >
                Delete Journal
              </button>
            ) : null}
          </div>
        </div>
      );
    }

    // Create journal modal
    else
      return (
        <div className="modal">
          <span className="close-modal" onClick={this.onClose}>
            &times;
          </span>
          <h1 className="header">Create a journal</h1>
          <div classname="row-group">
            <div className="form-group">
              <label>
                <div className="form-label">Journal Name (required)</div>
                <input
                  onChange={this.onChange}
                  value={this.state.journalName}
                  id="journalName"
                  type="text"
                  placeholder="My Awesome Journal"
                  className="form-input"
                />
              </label>
            </div>
            <div className="right-group">
              <label>
                <div className="form-label">Stock Name (required)</div>
                <input
                  onChange={this.onChange}
                  value={this.state.stock}
                  error={errors.stock}
                  id="stock"
                  type="text"
                  placeholder="stock"
                  className="form-input"
                />
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Action (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.action}
                error={errors.action}
                id="action"
                type="text"
                placeholder={"action"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">stockquantity (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.stockquantity}
                error={errors.stockquantity}
                id="stockquantity"
                type="text" 
                pattern="[0-9]*"
                placeholder={"10"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Starting Price (required) $</div>
              <input
                onChange={this.onChange}
                value={this.state.startingprice}
                error={errors.startingprice}
                id="startingprice"
                type="text"
                pattern="[0-9]*"
                placeholder={"100"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Stop Loss (required) $</div>
              <input
                onChange={this.onChange}
                value={this.state.stoploss}
                error={errors.stoploss}
                id="stoploss"
                type="text"
                pattern="[0-9]*"
                placeholder={"500"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Target Price (required)</div>
              <input
                onChange={this.onChange}
                value={this.state.targetprice}
                error={errors.targetprice}
                id="targetprice"
                type="text"
                pattern="[0-9]*"
                placeholder={"100"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Reason for Trade</div>
              <input
                onChange={this.onChange}
                value={this.state.reasonfortrade}
                error={errors.reasonfortrade}
                id="reasonfortrade"
                type="text"
                placeholder={"reasonfortrade"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Closing Price (required) $</div>
              <input
                onChange={this.onChange}
                value={this.state.closingprice}
                error={errors.closingprice}
                id="closingprice"
                type="text"
                pattern="[0-9]*"
                placeholder={"100"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Reason for Exit</div>
              <input
                onChange={this.onChange}
                value={this.state.reasonforexit}
                error={errors.reasonforexit}
                id="reasonforexit"
                type="text"
                placeholder={"reasonforexit"}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label">Emotional State</div>
              <input
                onChange={this.onChange}
                value={this.state.emotionalstate}
                error={errors.emotionalstate}
                id="emotionalstate"
                type="text"
                placeholder={"e.g. - Fearfull, Anxious"}
                className="form-input"
              />
            </label>
          </div>
{/*           <div className="form-label">Add team members (optional)</div>
          <button className="main-btn add-members" onClick={this.addMember}>
            Add another member
          </button>
          <div className="members">
            {members.map((val, id) => {
              let memberId = `member-${id}`,
                emailId = `email-${id}`;
              return (
                <div className="split" key={id}>
                  <label className="form-label" htmlFor={memberId}>
                    Name (required for teams)
                    <input
                      type="text"
                      name="name"
                      data-id={id}
                      id={memberId}
                      value={members[id].name}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <label className="form-label split-email" htmlFor={emailId}>
                    Email (required for teams)
                    <input
                      type="text"
                      name="email"
                      data-id={id}
                      id={emailId}
                      value={members[id].email}
                      className="form-input"
                      onChange={this.onChange}
                    />
                  </label>
                  <span
                    className="delete"
                    onClick={this.deleteMember.bind(this, id)}
                  >
                    REMOVE
                  </span>
                </div>
              );
            })}
          </div> */}
          <div>
            <button
              className="main-btn create-journal"
              onClick={this.createJournal}
            >
              Create Journal
            </button>
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  journals: state.journals,
  tasks: state.tasks,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createJournal, updateJournal, deleteJournal, createTask }
)(Modal);
