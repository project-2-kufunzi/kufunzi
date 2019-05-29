const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const uploadCloud = require('../config/cloudinary.config');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {
    user: req.user
  });
});

router.get("/profile", (req, res, next) => {
  console.log(req.user.isAdmin)
  console.log(req.user)
  if (req.user.isAdmin) {
    res.render('admin/profile', {
      user: req.user
    })
  } else {
    res.render('trainer/profile', {
      user: req.user
    })
  }

})

router.get('/editProfile', (req, res) => {
  //console.log(req.user)
  User.findById(req.user._id)
    .then(user => {
      res.render('editProfile', {
        user
      })
    })
})

router.post('/editProfile', uploadCloud.single('photo'), (req, res) => {
  // console.log('entreo en post de editar')
  const {
    name,
    phone
  } = req.body

  //SÍ clico en subir foto, que me añada eso al update
  const imgPath = req.file.url
  const imgName = req.file.originalname


  User.findByIdAndUpdate(req.user._id, {
      name,
      phone,
      imgPath,
      imgName
    })
    .then(user => {
      console.log('-----------usuario actualizado', user)
      res.redirect('/profile')
    }).catch(err => {
      next(err)
    })
})

module.exports = router;