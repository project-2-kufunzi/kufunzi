const express = require('express');
const router = express.Router();
const Workout = require('../../models/Workout.model')
const User = require('../../models/User.model')



/* Get all workouts */
router.get('/', (req, res, next) => {
  Workout.find()
    .then(workouts => res.render('admin/workouts/index', {
      workouts,
      user: req.user
    }))
    .catch(err => console.log(err))
});

router.get('/api', (req, res, next) => {
  Workout.find()
    .then(workouts => {
      res.json(workouts)
    })
    .catch(err => console.log(err))
})

router.get('/api/:id', (req, res, next) => {
  Workout.findById(req.params.id)
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
    duration,
    client,
    type,
    phases
  } = req.body

  const newWorkout = new Workout({
    date,
    address,
    duration,
    client,
    type,
    phases,
    adminId: req.user._id
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


router.get('/:id', (req, res) => {
  Workout.findById(req.params.id)
    .then(workout => {
      console.log(workout.address.location)
      res.render('admin/workouts/detail', {
        workout,
        coordinates: JSON.stringify(workout.address.location)
      })
    })
    .catch(err => {
      console.log(err)
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


// router.get('/:id/edit', (req, res) => {
//   Workout.findById(req.params.id)
//     .then(workout => res.render('admin/workouts/edit', {
//       workout
//     }))
//     .catch(err => console.log(err))
// })

// router.put('/:id', (req, res, next) => {
//   console.log('body', req.body)
//   const {
//     date,
//     address,
//     duration,
//     client,
//     type
//   } = req.body


//   const update = {


//   }

//   Workout.findByIdAndUpdate(req.params.id, update)
//     .then()
//     .catch()
//   newWorkout.save()
//     .then(workout => {
//       console.log('entreo en guardar')
//       console.log('workout guardado', workout)
//       return User.findByIdAndUpdate(req.user._id, {
//         $push: {
//           workouts: req.user._id
//         }
//       })

//     })
//     .then(user => {
//       console.log(user.workouts)
//       res.redirect('/workouts')
//     })
//     .catch(err => {
//       console.log(err)
//       res.render('admin/workouts/new', {
//         errmsg: "There was an error, try again"
//       })
//     })
// })



module.exports = router;