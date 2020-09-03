const router = require('express').Router(); 
let Group = require('../models/group.model'); 
let Participant = require('../models/participant.model');
let Facilitator = require('../models/facilitator.model');
let Book = require('../models/book.model');
let OtherStakeholder = require('../models/otherStakeholders.model');
let Lesson = require('../models/lesson.model');
let ServiceProject = require('../models/serviceProject.model');

// returns collection of groups
router.route('/').get((req, res) => {
    Group.find()
      .then(groups => res.json(groups))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // add group to collection of groups
  router.route('/add').post((req, res) => {
    const name = req.body.name;
    const location = req.body.location;
  
    const newGroup = new Group({
        name,
        location,
        facilitators: [],
        participants: [],
        serviceProjects: [],
        books: [],
        lessons: [],
        otherStakeholders: [],
    });
  
    newGroup.save()
      .then(() => res.json('Group added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  // adds facilitator to group corresponding to id (unless absent in collection)
router.route('/add_facilitator/:id/').post((req, res) => {
  const name = req.body.name;
  Group.findById(
    { _id: req.params.id })
    .exec()
    .then(group => {
      Facilitator.find({name: name}, { _id: 1}, (error, data) => {
        if(error){
          console.log(error)
        }
        if(!data.length){
          console.log("couldn't find the facilitator")
          group.save()
               .then(() => res.json('Facilitator not part of collection.'))
               .catch(err => res.status(400).json('Error on group save ' + err));
        } else {
          console.log("found the facilitator!")
          group.facilitators.push(data[0]);
          group.save()
               .then(() => res.json('Facilitator added to group!'))
               .catch(err => res.status(400).json('Error on group save: ' + err));

        }
      })
      .catch(err => res.status(400).json('Error: ' + err));

    })

});

// adds a service project to group corresponding to id (adds to collection)
router.route('/add_serviceProject/:id').post((req, res) => {
  const location = req.body.location; 
  const description = req.body.description;
  //const reflection = req.body.reflection;
  const date = Date(req.body.date);
  Group.findById(
    { _id: req.params.id })
    .exec()
    .then(group => {
      const serviceProject = new ServiceProject({
        location,
        description,
        //reflection,
        date
      });
      serviceProject.save()
      .then(serviceProject => {
        l = group.serviceProjects.push(serviceProject._id);
        group.save()
             .then(() => res.json('Service Project added!'))
             .catch(err => res.status(400).json('Error on group save: ' + err));
      })
      .catch(err => res.status(400).json('Error on serviceProject save: ' + err));
    })
})

// adds a book to the list of books in group (corresponding to id) has read
// if book is not in collection "books" also adds to that collection
router.route('/add_book/:id/').post((req, res) => {
  const title = req.body.title;
  Group.findById(
    { _id: req.params.id })
    .exec()
    .then(group => {

      Book.find({title: title}, { _id: 1}, (error, data) => {
        if(error){
          console.log(error)
        }
        if(!data.length){
          console.log("couldnt find the book")
          const book = new Book({title});
          book.save()
          .then(book => {
            l = group.books.push(book._id);
            group.save()
                       .then(() => res.json('Book added to group and to collection!'))
                       .catch(err => res.status(400).json('Error on group save: ' + err));
          })
          .catch(err => res.status(400).json('Error on book save: ' + err));
          
        }else{
          console.log("found the book!")
          group.books.push(data[0]);
          group.save()
                     .then(() => res.json('Book added to group!'))
                     .catch(err => res.status(400).json('Error on group save: ' + err));
        }

    })
    .catch(err => res.status(400).json('Error: ' + err));
})});

// adds a lesson to group corresponding to id (adds to collection)
router.route('/add_lesson/:id').post((req, res) => {
  const number = Number(req.body.number); 
  const description = req.body.description;
  const date = Date(req.body.date);
  Group.findById(
    { _id: req.params.id })
    .exec()
    .then(group => {
      const lesson = new Lesson({
        number,
        description,
        date
      });
      lesson.save()
      .then(lesson => {
        l = group.lessons.push(lesson._id);
        group.save()
             .then(() => res.json('Lesson added!'))
             .catch(err => res.status(400).json('Error on group save: ' + err));
      })
      .catch(err => res.status(400).json('Error on lesson save: ' + err));
    })
})


  // adds participant to group corresponding to id (unless absent from collection)
  router.route('/add_participant/:id/').post((req, res) => {
    const name = req.body.name;
    Group.findById(
      { _id: req.params.id })
      .exec()
      .then(group => {
        Participant.find({name: name}, { _id: 1}, (error, data) => {
          if(error){
            console.log(error)
          }
          if(!data.length){
            console.log("couldn't find the participant")
            group.save()
                 .then(() => res.json('Participant not part of collection.'))
                 .catch(err => res.status(400).json('Error on group save ' + err));
          } else {
            console.log("found the participant!")
            group.participants.push(data[0]);
            group.save()
                 .then(() => res.json('Participant added to group!'))
                 .catch(err => res.status(400).json('Error on group save: ' + err));
  
          }
        })
        .catch(err => res.status(400).json('Error: ' + err));
  
      })
  
  });


// adds other stakeholder to group corresponding to id (unless absent from collection)
  router.route('/add_otherStakeholders/:id/').post((req, res) => {
    const name = req.body.name;
    Group.findById(
      { _id: req.params.id })
      .exec()
      .then(group => {
        OtherStakeholder.find({name: name}, { _id: 1}, (error, data) => {
          if(error){
            console.log(error)
          }
          if(!data.length){
            console.log("couldn't find the other stakeholder")
            group.save()
                 .then(() => res.json('Other stakeholder not part of collection.'))
                 .catch(err => res.status(400).json('Error on group save ' + err));
          } else {
            console.log("found the other stakeholder!")
            group.otherStakeholders.push(data[0]);
            group.save()
                 .then(() => res.json('Other Stakeholder added to group!'))
                 .catch(err => res.status(400).json('Error on group save: ' + err));
  
          }
        })
        .catch(err => res.status(400).json('Error: ' + err));
  
      })
  
  });




  // returns group corresponding to the given id 
  router.route('/:id').get((req, res) => {
    Group.findById(req.params.id)
      .then(group => res.json(group))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // deletes group corresponding to the given id
  router.route('/:id').delete((req, res) => {
    Group.findByIdAndDelete(req.params.id)
      .then(() => res.json('Group deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // updates group corresponding to the id
  router.route('/update/:id').post((req, res) => {
    Group.findById(req.params.id)
      .then(group => {
        group.name = req.body.name;
  
        group.save()
          .then(() => res.json('Group updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  
  module.exports = router;