const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JournalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Object,
    required: true
  },
  teamMembers: [
    {
      email: {
        type: String
      },
      name: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  stock: {
    type: String,
    required: false
  },
  action: {
    type: String,
    required: false
  },
  stockquantity: {
    type: Number,
    required: false
  },
  startingprice: {
    type: Number,
    required: false
  } ,
  stoploss: {
    type: Number,
    required: false
  },
  targetprice: {
    type: Number,
    default: false
  },
  reasonfortrade: {
    type: String,
    required: false
  },
  closingprice: {
    type: Number,
    default: false
  },
  reasonforexit: {
    type: String,
    required: false
  },
  emotionalstate: {
    type: String,
    required: false
  }  
});

module.exports = Journal = mongoose.model("journals", JournalSchema);
