const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const uploadCloud = require('../config/cloudinary.config');



/* GET home page */
router.get('/', (req, res, next) => {
  if (req.user) {
    res.render('index', {
      user: req.user
    });
    return
  }
  res.render('auth/login')
})

router.get('/onboarding', (req, res, next) => {
  res.render('trainer/onboarding')
})

router.get("/profile", (req, res, next) => {
  if (req.user.isAdmin) {
    res.render('admin/profile/profile', {
      user: req.user
    })
  } else {
    res.render('trainer/profile/profile', {
      user: req.user
    })
  }

})

router.get('/editProfile', (req, res) => {
  //console.log(req.user)
  /*   if(req.user.role==='trainer'){

    } */
  User.findById(req.user._id)
    .then(user => {
      res.render('admin/profile/editProfile', { //hacer vista trainer
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

  console.log(req.body)
  console.log(req.file)
  //SÍ clico en subir foto, que me añada eso al update
  if (req.file) {
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
  }

  User.findByIdAndUpdate(req.user._id, {
      name,
      phone
    })
    .then(user => {
      console.log('-----------usuario actualizado', user)
      res.redirect('/profile')
    }).catch(err => {
      next(err)
    })


})

module.exports = router;