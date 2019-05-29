const express = require('express');
const router = express.Router();
const Exercise = require('../../models/Workout.model')



router.get('/:id', (req, res) => {

  Exercise.findById(req.params.id)
    .then(exercise => {
      if (exercise) {
        console.log(exercise)
        res.render('admin/exercises/detail', {
          exercise
        })
      }

    })
    .catch(err => {
      console.log(err)
    })

})

module.exports = router;