const router = require('express').Router();
let Lesson = require('../models/lesson.model');
let Participant = require('../models/participant.model');
let Facilitator = require('../models/facilitator.model');
let Book = require('../models/book.model');

// returns collection of lessons 
router.route('/').get((req, res) => {
    Lesson.find()
      .then(lessons => res.json(lessons))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // add lesson to collection of lessons
  router.route('/add').post((req, res) => {
    const number = Number(req.body.number);
    const date = Date(req.body.date); 
    const description = req.body.description;
  
    const newLesson = new Lesson({
        number,
        date,
        description,
        //reflection,
        participants: [],
        facilitators: [],
        books: [],
    });
  
    newLesson.save()
      .then(() => res.json('Lesson added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// adds participant to lesson corresponding to id (unless participant absent from collection)
router.route('/add_participant/:id/').post((req, res) => {
  const name = req.body.name;
  Lesson.findById(
    { _id: req.params.id })
    .exec()
    .then(lesson => {
      Participant.find({name: name}, { _id: 1}, (error, data) => {
        if(error){
          console.log(error)
        }
        if(!data.length){
          console.log("couldn't find the participant")
          lesson.save()
               .then(() => res.json('Participant not part of collection.'))
               .catch(err => res.status(400).json('Error on lesson save ' + err));
        } else {
          console.log("found the participant!")
          lesson.participants.push(data[0]);
          lesson.save()
               .then(() => res.json('Participant added to lesson!'))
               .catch(err => res.status(400).json('Error on lesson save: ' + err));

        }
      })
      .catch(err => res.status(400).json('Error: ' + err));

    })

});


  // adds facilitator to lesson corresponding to id (unless facilitator absent in collection)
  router.route('/add_facilitator/:id/').post((req, res) => {
    const name = req.body.name;
    Lesson.findById(
      { _id: req.params.id })
      .exec()
      .then(lesson => {
        Facilitator.find({name: name}, { _id: 1}, (error, data) => {
          if(error){
            console.log(error)
          }
          if(!data.length){
            console.log("couldn't find the facilitator")
            lesson.save()
                 .then(() => res.json('Facilitator not part of collection.'))
                 .catch(err => res.status(400).json('Error on lesson save ' + err));
          } else {
            console.log("found the facilitator!")
            lesson.facilitators.push(data[0]);
            lesson.save()
                 .then(() => res.json('Facilitator added to lesson!'))
                 .catch(err => res.status(400).json('Error on lesson save: ' + err));
  
          }
        })
        .catch(err => res.status(400).json('Error: ' + err));
  
      })
  
  });


  // adds a book to the list of books in group (corresponding to id) has read
// if book is not in collection "books" also adds to that collection
router.route('/add_book/:id/').post((req, res) => {
  const title = req.body.title;
  Lesson.findById(
    { _id: req.params.id })
    .exec()
    .then(lesson => {

      Book.find({title: title}, { _id: 1}, (error, data) => {
        if(error){
          console.log(error)
        }
        if(!data.length){
          console.log("couldnt find the book")
          const book = new Book({title});
          book.save()
          .then(book => {
            l = lesson.books.push(book._id);
            lesson.save()
                       .then(() => res.json('Book added to lesson and to collection!'))
                       .catch(err => res.status(400).json('Error on lesson save: ' + err));
          })
          .catch(err => res.status(400).json('Error on lesson save: ' + err));
          
        }else{
          console.log("found the book!")
          lesson.books.push(data[0]);
          lesson.save()
                     .then(() => res.json('Book added to lesson!'))
                     .catch(err => res.status(400).json('Error on lesson save: ' + err));
        }

    })
    .catch(err => res.status(400).json('Error: ' + err));
})});



  // returns lesson corresponding to given id 
  router.route('/:id').get((req, res) => {
    Lesson.findById(req.params.id)
      .then(lesson => res.json(lesson))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // deletes lesson corresponding to given id 
  router.route('/:id').delete((req, res) => {
    Lesson.findByIdAndDelete(req.params.id)
      .then(() => res.json('Lesson deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // updates lesson corresponding to the id. modify to allow for reflection update. 
  router.route('/update/:id').post((req, res) => {
    Lesson.findById(req.params.id)
      .then(lesson => {
        lesson.number = Number(req.body.number);
  
        lesson.save()
          .then(() => res.json('Lesson updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });




  
  module.exports = router;