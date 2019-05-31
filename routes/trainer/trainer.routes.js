const express = require('express');
const router = express.Router();
const User = require('../../models/User.model')

/* GET home page */

router.use('/workouts', require('./workouts.routes'));
router.use('/exercise', require('./../admin/exercise.routes')) //las tendria q duplicar?

const checkRoles = (role) => (req, res, next) => req.user && req.user.role === role ? next() : next(null)

router.use(checkRoles('trainer'))

router.get('/:id/detail', (req, res) => {
  //console.log('soy admin y estoy entrando en trainer')
  User.findById(req.params.id)
    .then(trainer => res.render('admin/trainers/details', {
      trainer,
    }))
    .catch(err => console.log(err))
})

router.get('/:id/delete', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(x => res.redirect('/profile'))
    .catch(err => console.log(err))
})





module.exports = router;