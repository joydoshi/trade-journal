const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
  journal: {
    type: Schema.Types.ObjectId,
    ref: "journals",
    required: true
  },
  taskName: {
    type: String,
    required: true
  },
  dateDue: {
    type: String
  },
  assignee: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Task = mongoose.model("tasks", TaskSchema);
