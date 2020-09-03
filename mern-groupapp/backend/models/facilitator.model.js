const mongoose = require('mongoose');
const Book = require('./book.model').schema;

const Schema = mongoose.Schema;

const facilitatorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },

  email: {
      type: String,
      required: false,
      unique: false,
      trim: true,
      minLength: 3
  },

  cellNumber: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
      minLength: 7
  },


  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book', 
      require: false,
    }
  ]

}, {
  timestamps: true,
});

const Facilitator = mongoose.model('Facilitator', facilitatorSchema);

module.exports = Facilitator;