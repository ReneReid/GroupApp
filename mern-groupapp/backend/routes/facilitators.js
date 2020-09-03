const router = require('express').Router(); 
let Facilitator = require('../models/facilitator.model'); 
let Book = require('../models/book.model'); 
const { json } = require('express');


// returns collection of facilitators
router.route('/').get((req, res) => {
    Facilitator.find()
      .then(facilitators => res.json(facilitators))
      .catch(err => res.status(400).json('Error: ' + err));
  });


//add facilitator to collection of facilitators
  router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const cellNumber = Number(req.body.cellNumber); 
    //const books = [Book(req.body.book)];
    //const books = [];
  
    const newFacilitator = new Facilitator({
        name,
        email,
        cellNumber, 
        books: [],
    });
  
    newFacilitator.save()
      .then(() => res.json('Facilitator added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// adds a book to the list of books facilitator (corresponding to id) has read
// if book is not in collection "books" also adds to that collection
  router.route('/add_book/:id/').post((req, res) => {
    const title = req.body.title;
    Facilitator.findById(
      { _id: req.params.id })
      .exec()
      .then(facilitator => {
        /* const book = new Book({
          title
        }); */
        Book.find({title: title}, { _id: 1}, (error, data) => {
          if(error){
            console.log(error)
          }
          if(!data.length){
            console.log("couldnt find the book")
            const book = new Book({title});
            //console.log(book._id)
            book.save()
            .then(book => {
              l = facilitator.books.push(book._id);
              facilitator.save()
                         //.then((facilitator) => res.status(200).json(facilitator))
                         .then(() => res.json('Book added to facilitator and to collection!'))
                         .catch(err => res.status(400).json('Error on facilitator save: ' + err));
            })
            .catch(err => res.status(400).json('Error on book save: ' + err));
            
          }else{
            //console.log(data[0])
            console.log("found the book!")
            facilitator.books.push(data[0]);
            facilitator.save()
                       //.then((facilitator) => res.status(200).json(facilitator))
                       .then(() => res.json('Book added to facilitator!'))
                       .catch(err => res.status(400).json('Error on facilitator save: ' + err));
          }

      })
      .catch(err => res.status(400).json('Error: ' + err));
})});

// gets the facilitator info, given an ID number
  router.route('/:id').get((req, res) => {
    Facilitator.findById(req.params.id)
      .then(facilitator => res.json(facilitator))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // deletes facilitator associated with id 
  router.route('/:id').delete((req, res) => {
    Facilitator.findByIdAndDelete(req.params.id)
      .then(() => res.json('Facilitator deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// updates the facilitator information (need to update all fields)
  router.route('/update/:id').post((req, res) => {
    Facilitator.findById(req.params.id)
      .then(facilitator => {
        facilitator.name = req.body.name;
        facilitator.email = req.body.email;
        facilitator.cellNumber = Number(req.body.cellNumber);
  
        facilitator.save()
          .then(() => res.json('Facilitator updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });



  
  module.exports = router;