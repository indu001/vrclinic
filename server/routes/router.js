const express = require('express');
const { User } = require('../sequelize');
const path = require('path');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', (req, res, next) => {
  return res.send('server running')
});

router.post('/', (req, res, next) => {


  //check if password re-entered matches
  if (req.body.password && req.body.passwordConf && req.body.password !== req.body.passwordConf) {
    const err = new Error('Passwords do not match');
    err.status = 400;
    res.send('Passwords do not match');
    return next(err);
  }

  // create new user
  if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordconf: req.body.passwordConf
    };

    User.create(userData).then(
      (user) => {

        req.session.userId = user.id;
        return res.redirect('/profile');
      }
    ).catch(err => {
      res.send(err.message);
    });
  }
  else if (req.body.logemail && req.body.logpassword) {

    // authenticate  user credentials on login

    User.findAll({ where: { email: req.body.logemail } })
      .then((user) => {
        let passw =user.length ?user[0].password:'';
        bcrypt.compare(req.body.logpassword, passw)
          .then(result => {
            if (result === true) {
              req.session.userId = user[0].id;
              res.send('hola');
            } else {
              const error = new Error('Password incorrect');
              res.send('Password Incorrect');
            }
          }).catch(err => {
            res.send(err);
          })

      }).catch(err => {
        const error = new Error('User not found');
        error.status = err.status;
        res.send(error);
      })

  } else {
    const err = new Error('All fields are mandatory');
    err.status = 400;
    return next(err);
  }
});

//profile 
router.get('/profile', function (req, res, next) {
  User.findOne({ where: { id: req.session.userId } })
    .then(user => {
      if (user === null) {
        const err = new Error('Unauthorized');
        err.status = 400;
        res.send(err);
      } else {
        return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>');
      }

    })
    .catch(err => {
      res.send(err.message);
    })
});

//logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});


module.exports = router;
