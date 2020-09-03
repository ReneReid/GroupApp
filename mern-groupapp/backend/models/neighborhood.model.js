const mongoose = require('mongoose');
const Group = require('./group.model').schema;


const Schema = mongoose.Schema;

const neighborhoodSchema = new Schema({
  location: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group', 
      require: false,
    }
  ]

}, {
  timestamps: true,
});

const Neighborhood = mongoose.model('Neighborhood', neighborhoodSchema);

module.exports = Neighborhood;