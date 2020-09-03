const router = require('express').Router();
let Participant = require('../models/participant.model').schema;
let Facilitator = require('../models/facilitator.model').schema;
let Book = require('../models/book.model').schema;
let OtherStakeholder = require('../models/otherStakeholders.model').schema;
let ServiceProject = require('../models/serviceProject.model');

// returns collection of service projects
router.route('/').get((req, res) => {
  ServiceProject.find()
    .then(serviceProjects => res.json(serviceProjects))
    .catch(err => res.status(400).json('Error: ' + err));
});

// adds serviec project to collection of service projects
router.route('/add').post((req, res) => {
  
  const location = req.body.location;
  const description = req.body.description;
  const reflections = req.body.reflections;


  const newServiceProject = new ServiceProject({
    location,
    description,
    reflections
  });

  newServiceProject.save()
  .then(() => res.json('Service Project added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


// adds other stakeholder to group corresponding to id (unless absent from collection)
router.route('/add_otherStakeholders/:id/').post((req, res) => {
  const name = req.body.name;
  ServiceProject.findById(
    { _id: req.params.id })
    .exec()
    .then(serviceProject => {
      OtherStakeholder.find({name: name}, { _id: 1}, (error, data) => {
        if(error){
          console.log(error)
        }
        if(!data.length){
          console.log("couldn't find the other stakeholder")
          serviceProject.save()
               .then(() => res.json('Other stakeholder not part of collection.'))
               .catch(err => res.status(400).json('Error on service project save ' + err));
        } else {
          console.log("found the other stakeholder!")
          serviceProject.otherStakeholders.push(data[0]);
          serviceProject.save()
               .then(() => res.json('Other Stakeholder added to service project!'))
               .catch(err => res.status(400).json('Error on service project save: ' + err));

        }
      })
      .catch(err => res.status(400).json('Error: ' + err));

    })

});

router.route('/add_facilitator/:id/').post((req, res) => {
  const name = req.body.name;
  ServiceProject.findById(
    { _id: req.params.id })
    .exec()
    .then(serviceProject => {
      Facilitator.find({name: name}, { _id: 1}, (error, data) => {
        if(error){
          console.log(error)
        }
        if(!data.length){
          console.log("couldn't find the facilitator")
          serviceProject.save()
               .then(() => res.json('Facilitator not part of collection.'))
               .catch(err => res.status(400).json('Error on service project save ' + err));
        } else {
          console.log("found the facilitator!")
          serviceProject.facilitators.push(data[0]);
          serviceProject.save()
               .then(() => res.json('Facilitator added to service project!'))
               .catch(err => res.status(400).json('Error on service project save: ' + err));

        }
      })
      .catch(err => res.status(400).json('Error: ' + err));

    })

});


// adds a book to the list of books in service project (corresponding to id) has read
// if book is not in collection "books" also adds to that collection
router.route('/add_book/:id/').post((req, res) => {
  const title = req.body.title;
  ServiceProject.findById(
    { _id: req.params.id })
    .exec()
    .then(serviceProject => {

      Book.find({title: title}, { _id: 1}, (error, data) => {
        if(error){
          console.log(error)
        }
        if(!data.length){
          console.log("couldnt find the book")
          const book = new Book({title});
          book.save()
          .then(book => {
            l = serviceProject.books.push(book._id);
            serviceProject.save()
                       .then(() => res.json('Book added to service project and to collection!'))
                       .catch(err => res.status(400).json('Error on group save: ' + err));
          })
          .catch(err => res.status(400).json('Error on book save: ' + err));
          
        }else{
          console.log("found the book!")
          serviceProject.books.push(data[0]);
          serviceProject.save()
                     .then(() => res.json('Book added to service project!'))
                     .catch(err => res.status(400).json('Error on service project save: ' + err));
        }

    })
    .catch(err => res.status(400).json('Error: ' + err));
})});


// adds participant to service project corresponding to id (unless absent from collection)
router.route('/add_participant/:id/').post((req, res) => {
  const name = req.body.name;
  ServiceProject.findById(
    { _id: req.params.id })
    .exec()
    .then(serviceProject => {
      Participant.find({name: name}, { _id: 1}, (error, data) => {
        if(error){
          console.log(error)
        }
        if(!data.length){
          console.log("couldn't find the participant")
          serviceProject.save()
               .then(() => res.json('Participant not part of collection.'))
               .catch(err => res.status(400).json('Error on service project save ' + err));
        } else {
          console.log("found the participant!")
          serviceProject.participants.push(data[0]);
          serviceProject.save()
               .then(() => res.json('Participant added to service project!'))
               .catch(err => res.status(400).json('Error on service project save: ' + err));

        }
      })
      .catch(err => res.status(400).json('Error: ' + err));

    })

});




// returns a service project corresponding to given id 
router.route('/:id').get((req, res) => {
    ServiceProject.findById(req.params.id)
      .then(serviceProject => res.json(serviceProject))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  // deletes service project corresponding to given id 
  router.route('/:id').delete((req, res) => {
    ServiceProject.findByIdAndDelete(req.params.id)
      .then(() => res.json('ServiceProject deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // updates group corresponding to the id 
  router.route('/update/:id').post((req, res) => {
    ServiceProject.findById(req.params.id)
      .then(serviceProject => {
        serviceProject.location = req.body.location;
        serviceProject.description = req.body.description;
        serviceProject.reflections = req.body.reflections;
  
        serviceProject.save()
          .then(() => res.json('ServiceProject updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;