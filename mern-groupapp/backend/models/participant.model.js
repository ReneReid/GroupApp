const mongoose = require('mongoose');
const Book = require('./book.model').schema;

const Schema = mongoose.Schema;

const participantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },

  emailAdress: {
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
      minlength: 7
  },

  dateOfBirth: {
      type: Date,
      required: true,
      unique: false
  },

  address: {
      type: String, 
      required: false,
      unique: false,
      trim: true, 
      minlength: 3
  },

  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book', 
      require: false,
    }
  ],

}, {
  timestamps: true,
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;