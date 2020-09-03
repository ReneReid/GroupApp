const mongoose = require('mongoose');
const Facilitator = require('./facilitator.model');
const Participant = require('./participant.model').schema;
const Book = require('./book.model').schema;
const OtherStakeholder = require('./otherStakeholders.model').schema;
const Lesson = require('./lesson.model').schema;
const ServiceProject = require('./serviceProject.model').schema;

const Schema = mongoose.Schema; 

const groupSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },

    location: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 3
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

    lessons: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Lesson',
            require: false,
        }
    ],

    serviceProjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ServiceProject',
            require: false,
        }
    ]


}, {
    timestamps: true,
}); 

const Group = mongoose.model('Group', groupSchema); 

module.exports = Group; 