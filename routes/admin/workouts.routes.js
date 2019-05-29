const express = require('express');
const router = express.Router();
const Workout = require('../../models/Workout.model')



/* Get all workouts */
router.get('/', (req, res, next) => {
  Workout.find()
    .then(workouts => res.render('admin/workouts/index', {
      workouts
    }))
    .catch(err => console.log(err))
});

router.get('/api', (req, res, next) => {
  Workout.find()
    .then(workouts => {
      res.json(workouts)
    })
    .catch(err => console.log(err))
});


/* Create new workout */
router.get('/new', (req, res, next) => {
  res.render('admin/workouts/new')

});


router.post('/', (req, res, next) => {
  console.log('body', req.body)
  const {
    date,
    address,
    client,
    type,
    phases
  } = req.body

  const newWorkout = new Workout({
    date,
    address,
    client,
    type,
    phases
  })
  console.log('newworkout:', newWorkout)

  newWorkout.save()
    .then(workout => {
      console.log('entreo en guardar')
      console.log('workout guardado', workout)
      res.redirect('/workouts')
    })
    .catch(err => {
      console.log(err)
      res.render('admin/workouts/new', {
        errmsg: "There was an error, try again"
      })
    })
})


router.delete('/:id', (req, res) => {
  Workout.findByIdAndDelete(req.params.id)
    .then(workout => {
      console.log(workout)
      res.redirect('/workouts')
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})





module.exports = router;