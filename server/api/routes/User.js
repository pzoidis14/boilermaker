'use strict';

const router = require('express').Router();
const { User } = require('../../db');

module.exports = router;

// log a user in
// assumes req.body contains identifying key-value pairs (like an email field), and that users have some instance method to evaluate the password on req.body
router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found');
      } else if (!user.hasMatchingPassword(req.body.password)) {
        res.status(401).send('Incorrect password');
      } else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

// create a new user
router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});

// log a user out
router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

// fetch the logged-in user
// client makes this request every time the client application loads - this allows us to keep the user logged in on the client even after they refresh
// works because passport attaches the session user to the request object
router.get('/me', (req, res, next) => {
  res.json(req.user);
});
