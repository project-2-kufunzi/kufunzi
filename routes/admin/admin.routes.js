const express = require('express');
const router = express.Router();
const uploadCloud = require('../../config/cloudinary.config')
const User = require('../../models/User.model')



router.use('/workouts', require('./workouts.routes'));
router.use('/exercise', require('./exercise.routes'))

/* GET home page */
router.get('/showAllTrainers', (req, res) => {
  User.find({
      role: 'trainer'
    })
    .then(users => {
      res.status(200).json(users)
      /* res.render('admin/showAllTrainers', {
      users,
      }) */
    })
    .catch(err => console.log(err))
})

router.get('/:id/detail', (req, res) => {
  //console.log('detail en admin')
  User.findById(req.params.id)
    .then(trainer => res.render('admin/trainer/details', {
      trainer,
    }))
    .catch(err => console.log(err))
})


router.get('/:id/delete', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(x => res.redirect('/profile'))
    .catch(err => console.log(err))
})


// COMMENTS

/* Comments routes del file-upload de Leti*/
//router.post('/:id/comment', uploadCloud.single('pic'), (req, res) => {

//   const {
//     content,
//     imageName
//   } = req.body

//   const imagePath = req.file.url

//   const update = {
//     $push: {
//       comments: {
//         content,
//         imageName,
//         imagePath,
//         authorId: req.user._id
//       }
//     }
//   }

//   Post.findByIdAndUpdate(req.params.id, update)
//     .then(post => {
//       console.log('Find by id and update:', post)
//       res.redirect(`/posts/${req.params.id}`)
//     })
//     .catch(err => console.log(err))
// })


module.exports = router;
// router.get('/newTrainer', /*ensureLoggedIn(),*/ (req, res) => {
//   res.render('/newTrainer')
// })

// router.post('/new', [ensureLoggedIn('/login', {
//   msg: 'no estas logueado'
// }), uploadCloud.single('pic')], (req, res) => {

//   const {
//     content,
//     picName
//   } = req.body

//   const picPath = req.file.url
//   const creatorId = req.user._id

//   console.log(req.user._id)
//   const newPost = new Post({
//     content,
//     picName,
//     picPath,
//     creatorId
//   })

//   newPost.save()
//     .then(post => {
//       console.log(post._doc)
//       res.render('posts/show', {
//         post: post._doc
//       })

//     })
//     .catch(err => console.log(err))

// })




// /* Comments routes */

// router.post('/:id/comment', uploadCloud.single('pic'), (req, res) => {

//   const {
//     content,
//     imageName
//   } = req.body

//   const imagePath = req.file.url

//   const update = {
//     $push: {
//       comments: {
//         content,
//         imageName,
//         imagePath,
//         authorId: req.user._id
//       }
//     }
//   }

//   Post.findByIdAndUpdate(req.params.id, update)
//     .then(post => {
//       console.log('Find by id and update:', post)
//       res.redirect(`/posts/${req.params.id}`)
//     })
//     .catch(err => console.log(err))
// })


module.exports = router;