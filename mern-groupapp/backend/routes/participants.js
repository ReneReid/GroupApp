const router = require('express').Router();
let Participant = require('../models/participant.model');
let Book = require('../models/book.model').schema;


// returns collection of participants
router.route('/').get((req, res) => {
  Participant.find()
    .then(participants => res.json(participants))
    .catch(err => res.status(400).json('Error: ' + err));
});

// adds participant to collection of participants
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const emailAddress = req.body.emailAddress;
  const cellNumber = Number(req.body.cellNumber);
  const dateOfBirth = Date(req.body.dateOfBirth);
  const address = req.body.address;


  const newParticipant = new Participant({
    name,
    emailAddress, 
    cellNumber,
    dateOfBirth,
    address, 
    books: [],

  });

  newParticipant.save()
  .then(() => res.json('Participant added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


// adds a book to the list of books in group (corresponding to id) has read
// if book is not in collection "books" also adds to that collection
router.route('/add_book/:id/').post((req, res) => {
  const title = req.body.title;
  Participant.findById(
    { _id: req.params.id })
    .exec()
    .then(participant => {

      Book.find({title: title}, { _id: 1}, (error, data) => {
        if(error){
          console.log(error)
        }
        if(!data.length){
          console.log("couldnt find the book")
          const book = new Book({title});
          book.save()
          .then(book => {
            l = participant.books.push(book._id);
            participant.save()
                       .then(() => res.json('Book added to participant and to collection!'))
                       .catch(err => res.status(400).json('Error on participant save: ' + err));
          })
          .catch(err => res.status(400).json('Error on book save: ' + err));
          
        }else{
          console.log("found the book!")
          participant.books.push(data[0]);
          participant.save()
                     .then(() => res.json('Book added to participant!'))
                     .catch(err => res.status(400).json('Error on participant save: ' + err));
        }

    })
    .catch(err => res.status(400).json('Error: ' + err));
})});



// returns participant corresponding to given id
router.route('/:id').get((req, res) => {
    Participant.findById(req.params.id)
      .then(participant => res.json(participant))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  
  // deletes participant corresponding to id 
  router.route('/:id').delete((req, res) => {
    Participant.findByIdAndDelete(req.params.id)
      .then(() => res.json('Participant deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // updates participant corresponding to id 
  router.route('/update/:id').post((req, res) => {
    Participant.findById(req.params.id)
      .then(participant => {
        participant.name = req.body.name;
        participant.emailAddress = req.body.emailAddress;
        participant.cellNumber = Number(req.body.cellNumber);
        participant.dateOfBirth = Date.parse(req.body.dateOfBirth);
        participant.address = req.body.address;
  
        participant.save()
          .then(() => res.json('Participant updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;