const mongoose = require('mongoose');
const Participant = require('./participant.model').schema;
const Facilitator = require('./facilitator.model').schema;
const Book = require('./book.model').schema;
const OtherStakeholder = require('./otherStakeholders.model').schema;

const Schema = mongoose.Schema;

const serviceProjectSchema = new Schema({
  location: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },

  description: {
      type: String, 
      required: true,
      unique: true,
      minlength: 3
  },

  date: {
      type: Date,
      required: true, 
      unique: false
  },

  participants: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant',
        require: false,
    }
],


facilitators: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facilitator',
        require: false,
    }
],

books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book', 
      require: false,
    }
  ],

otherStakeholders: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OtherStakeholder',
        require: false,
    }
],


  reflections: {
      type: String, 
      required: false,
      unique: false,
      minlength: 3
  }

}, {
  timestamps: true,
});

const ServiceProject = mongoose.model('Service Project', serviceProjectSchema);

module.exports = ServiceProject;