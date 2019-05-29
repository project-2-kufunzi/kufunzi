const express = require('express');
const router = express.Router();

const Workout = require('../../models/Workout.model')
const User = require('../../models/User.model')

/* Get all workouts */
router.get('/', (req, res, next) => {
  Workout.find({
      trainerId: req.user._id
    })
    .then(workouts => res.render('trainer/workouts/index', {
      workouts,
      user: req.user
    }))
    .catch(err => console.log(err))
});

router.get('/api', (req, res, next) => {
  Workout.find({
      trainerId: req.user._id
    })
    .then(workouts => {
      res.json(workouts)
    })
    .catch(err => console.log(err))
})

// router.get('/api/:id', (req, res, next) => {
//   Workout.findById(req.params.id)
//     .then(workouts => {
//       res.json(workouts)
//     })
//     .catch(err => console.log(err))
// });



// /* Create new workout */
router.get('/new', (req, res, next) => {
  res.render('trainer/workouts/new')

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
    phases,
    trainerId: req.user._id
  })
  console.log('newworkout:', newWorkout)


  newWorkout.save()
    .then(workout => {
      console.log('entreo en guardar')
      console.log('workout guardado', workout)
      return User.findByIdAndUpdate(req.user._id, {
        $push: {
          workouts: req.user._id
        }
      })

    })
    .then(user => {
      console.log(user.workouts)
      res.redirect('/workouts')
    })
    .catch(err => {
      console.log(err)
      res.render('admin/workouts/new', {
        errmsg: "There was an error, try again"
      })
    })
})


// router.get('/:id', (req, res) => {
//   Workout.findById(req.params.id)
//     .then(workout => {
//       console.log(workout.address.location)
//       res.render('admin/workouts/detail', {
//         workout,
//         coordinates: JSON.stringify(workout.address.location)
//       })
//     })
//     .catch(err => {
//       console.log(err)
//     })
// })

// router.delete('/:id', (req, res) => {
//   Workout.findByIdAndDelete(req.params.id)
//     .then(workout => {
//       console.log(workout)
//       res.redirect('/workouts')
//     })
//     .catch(err => {
//       console.log(err)
//       next(err)
//     })
// })





module.exports = router;