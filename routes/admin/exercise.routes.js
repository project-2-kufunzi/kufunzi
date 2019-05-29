const express = require('express');
const router = express.Router();
const Exercise = require('../../models/Exercise.model')
const Workout = require('../../models/Workout.model')
const axios = require('axios')


router.get('/api/:id', (req, res) => {

  Exercise.findOne({
      id: req.params.id
    })
    .then(exercise => {

      if (exercise) {
        res.json({
          name: exercise.data.name,
          id: exercise._id
        })
        return
      }
      return axios.get(`https://wger.de/api/v2/exerciseinfo/${req.params.id}`)
    })
    .then(response => {
      const {
        name,
        category,
        description,
        muscles,
        muscles_secondary,
        equipment
      } = response.data

      console.log(response.data.name)
      const newExercise = new Exercise({
        id: req.params.id,
        data: {
          name,
          category,
          description,
          muscles,
          muscles_secondary,
          equipment
        }

      })

      return newExercise.save()
      //res.json(response.data)
    })
    .then(created => res.json({
      name: created.data.name,
      id: created._id
    }))
    .catch(err => {
      console.log(err)
    })

})

router.get('/:id', (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      console.log(exercise)
      res.render('admin/exercises/detail', {
        exercise
      })
    })
    .catch(err => {
      console.log(err)
    })
})


router.get('/:id/workouts', (req, res) => {
  Workout.findById(req.params.id)
    .then(exercise => {
      console.log(exercise)
      res.render('admin/exercises/detail', {
        exercise
      })
    })
    .catch(err => {
      console.log(err)
    })
})



module.exports = router;