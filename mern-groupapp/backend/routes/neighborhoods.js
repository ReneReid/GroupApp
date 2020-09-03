const router = require('express').Router();
//let Group = require('../models/group.model').schema;
let Neighborhood = require('../models/neighborhood.model');


// returns collection of neighborhoods
router.route('/').get((req, res) => {
  Neighborhood.find()
    .then(neighborhoods => res.json(neighborhoods))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add neigborhood to collection of neighborhoods
router.route('/add').post((req, res) => {
  const location = req.body.location;

  const newNeighborhood = new Neighborhood({
    location, 
    groups: [],
  });

  newNeighborhood.save()
  .then(() => res.json('Neighborhood added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// adds a group to the list of groups in neighborhood (corresponding to id) has read
// if group is not in collection "groups" also adds to that collection
router.route('/add_group/:id/').post((req, res) => {
  const name = req.body.name;
  const location = req.body.location;
  Neighborhood.findById(
    { _id: req.params.id })
    .exec()
    .then(neighborhood => {

      Group.find({name: name}, { _id: 1}, (error, data) => {
        if(error){
          console.log(error)
        }
        if(!data.length){
          console.log("couldnt find the group")
          const group = new Group({name, location});
          group.save()
          .then(group => {
            l = neighborhood.groups.push(group._id);
            neighborhood.save()
                       .then(() => res.json('Group added to neighborhood and to collection!'))
                       .catch(err => res.status(400).json('Error on neighborhood save: ' + err));
          })
          .catch(err => res.status(400).json('Error on neighborhood save: ' + err));
          
        }else{
          console.log("found the group!")
          group.books.push(data[0]);
          group.save()
                     .then(() => res.json('Group added to neighborhood!'))
                     .catch(err => res.status(400).json('Error on neighborhood save: ' + err));
        }

    })
    .catch(err => res.status(400).json('Error: ' + err));
})});





// returns neighborhood corresponding to given id 
router.route('/:id').get((req, res) => {
  Neighborhood.findById(req.params.id)
    .then(neighborhood => res.json(neighborhood))
    .catch(err => res.status(400).json('Error: ' + err));
});


// deletes neighborhood corresponding to id
router.route('/:id').delete((req, res) => {
  Neighborhood.findByIdAndDelete(req.params.id)
    .then(() => res.json('Neighborhood deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// updates neighborhood corresponding to id 
router.route('/update/:id').post((req, res) => {
  Neighborhood.findById(req.params.id)
    .then(neighborhood => {
      neighborhood.location = req.body.location;

      neighborhood.save()
        .then(() => res.json('Neighborhood updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});





module.exports = router;