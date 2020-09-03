const mongoose = require('mongoose');
const Participant = require('./participant.model').schema;

const Schema = mongoose.Schema;

const otherStakeholderSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },

  emailAddress: {
      type: String,
      required: false,
      unique: false,
      trim: true,
      minlength: 3
  },

  cellNumber: {
      type: Number, 
      required: false,
      unique: false,
      trim: true,
      minlength: 3
  },

  address: {
      type: String, 
      required: false, 
      unique: false,
      trim: true, 
      minlength: 3
  },

  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Participant', 
      require: false,
    }
  ]

}, {
  timestamps: true,
});

const OtherStakeholder = mongoose.model('Other Stakeholder', otherStakeholderSchema);

module.exports = OtherStakeholder;