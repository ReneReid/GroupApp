const mongoose = require('mongoose');
const Participant = require('./participant.model').schema;
const Facilitator = require('./facilitator.model').schema;
const Book = require('./book.model').schema;

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  number: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },

  date: {
    type: Date,
    required: true, 
    unique: false
},

  description: {
    type: String,
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


  /* reflection: {
      type: String,
      required: false,
      unique: false,
      trim: true
  } */


}, {
  timestamps: true,
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;