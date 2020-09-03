const router = require('express').Router();
let Participant = require('../models/participant.model').schema;
let OtherStakeholder = require('../models/otherStakeholders.model');

// returns collection of other stakeholders
router.route('/').get((req, res) => {
  OtherStakeholder.find()
    .then(otherStakeholders => res.json(otherStakeholders))
    .catch(err => res.status(400).json('Error: ' + err));
});

// adds another 'otherStakeholder' to collection of otherStakeholders
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const emailAddress = req.body.emailAddress;
  const cellNumber = Number(req.body.cellNumber);
  const address = req.body.address;



  const newOtherStakeholder = new OtherStakeholder({
    name,
    emailAddress, 
    cellNumber,
    address
  });

  newOtherStakeholder.save()
  .then(() => res.json('OtherStakeHolder added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


// adds participant to group corresponding to id (unless absent from collection)
router.route('/add_participant/:id/').post((req, res) => {
  const name = req.body.name;
  OtherStakeholder.findById(
    { _id: req.params.id })
    .exec()
    .then(otherStakeholders => {
      Participant.find({name: name}, { _id: 1}, (error, data) => {
        if(error){
          console.log(error)
        }
        if(!data.length){
          console.log("couldn't find the participant")
          otherStakeholders.save()
               .then(() => res.json('Participant not part of collection.'))
               .catch(err => res.status(400).json('Error on group save ' + err));
        } else {
          console.log("found the participant!")
          otherStakeholder.participants.push(data[0]);
          otherStakeholder.save()
               .then(() => res.json('Participant added to otherStakeholders!'))
               .catch(err => res.status(400).json('Error on group save: ' + err));

        }
      })
      .catch(err => res.status(400).json('Error: ' + err));

    })

});



// returns otherStakeholder corresponding to the given id
router.route('/:id').get((req, res) => {
    OtherStakeholder.findById(req.params.id)
      .then(otherStakeholder => res.json(otherStakeholder))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  // deletes otherStakeholder corresponding to given id 
  router.route('/:id').delete((req, res) => {
    OtherStakeholder.findByIdAndDelete(req.params.id)
      .then(() => res.json('OtherStakeHolder deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // updates otherStakeholder corresponding to the id 
  router.route('/update/:id').post((req, res) => {
    OtherStakeholder.findById(req.params.id)
      .then(otherStakeholder => {
        otherStakeholder.name = req.body.name;
        otherStakeholder.emailAddress = req.body.emailAddress;
        otherStakeholder.cellNumber = Number(req.body.cellNumber);
        otherStakeholder.address = req.body.address;
  
        otherStakeholder.save()
          .then(() => res.json('OtherStakeHolder updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;