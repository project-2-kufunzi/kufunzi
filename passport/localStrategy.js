const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //paso el objeto req al callback para poder acceder a todos las propiedades del req.body
  },
  (req, email, password, done) => {
    User.findOne({
        email
      })
      .then(foundUser => {
        if (!foundUser) {
          done(null, false, {
            message: 'Incorrect email'
          });
          return;
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
          done(null, false, {
            message: 'Incorrect password'
          });
          return;
        }

        done(null, foundUser);
        console.log('usuario logueado:', req.user)
      })
      .catch(err => done(err));
  }
));

passport.use("local-signup", new LocalStrategy({ //cuando en el signup queramos más campos 
    passReqToCallback: true,
    usernameField: 'email'
  },
  (req, email, password, done) => {
    const {
      phone,
      name
    } = req.body
    if (email === "" || password === "") {
      done(null, false, {
        message: "No email or password"
      }) //primer paramentro->¿Hay error?, segundo parametro: ¿hay usuario?true o false, message de informacion
      return;
    }

    User.findOne({
      email
    }, "email", (err, user) => {
      if (user !== null) {
        done(null, false, {
          message: "The email already exists"
        })
        return;
      }
    })

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      password: hashPass,
      name,
      phone
    });

    newUser.save()
      .then(user => {
        done(null, user)
      })
      .catch(err => {
        done(err)
      })
  }
))