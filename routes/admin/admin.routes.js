const express = require('express');
const router = express.Router();



router.use('/workouts', require('./workouts.routes'));

/* GET home page */
router.get('/', (req, res, next) => {

});

module.exports = router;