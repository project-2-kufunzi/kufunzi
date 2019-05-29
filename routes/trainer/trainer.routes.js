const express = require('express');
const router = express.Router();
const uploadCloud = require('../../config/cloudinary.config')
const User = require('../../models/User.model')




router.use('/workouts', require('./workouts.routes'));
router.use('/exercise', require('./../admin/exercise.routes')) //las tendria q duplicar?

/* GET home page */
router.get('/', (req, res, next) => {

});


router.get('/showAllTrainers', (req, res) => {
  User.find()
    .then(users => res.render('admin/showAllTrainers', {
      users,
    }))
    .catch(err => console.log(err))
})

router.get('/:id/detail', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.render('admin/showTrainerDetails', {
      user,

    }))
    .catch(err => console.log(err))
})

router.get('/:id/delete', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(x => res.redirect('/showAllTrainers'))
})





module.exports = router;