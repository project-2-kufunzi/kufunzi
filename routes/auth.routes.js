const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User.model");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", {
    "message": req.flash("error")
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup", {
    message: req.flash("error") //es lo mismo que si le paso solo msg.message
  });
});

router.post("/signup", (req, res, next) => {

  passport.authenticate("local-signup", (err, user, msg) => {
    //Primer parámetro:  que LocalStrategy queremos utilizar? --> "local-signup"
    //Segundo parametro: es lo que pasamos en done

    if (err) {
      next(err) //se pasa a www, linea 13.
      return
    }
    if (!user) {
      req.flash("error", msg.message) //Configura flash par poder mostrar el error
      res.redirect("/auth/signup")
    }

    req.login(user, err => { //viene de pasport, nosotros le pasamos el usuario y hace el login
      if (err) {
        next(err)
        return
      } else {
        res.redirect("/") //sesion iniciada
      }
    })
  })(req, res, next) //porque authenticate devuelve una funcion que tenemos que ejecutar

});




router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;