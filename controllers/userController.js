const db = require('../models');
const User = require('../models/User');
const passport = require('passport');

module.exports = {
  findAll: function (req, res) {
    User
      .find(req.query)
      .sort({ date: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUsername: function (req, res) {
    User
      .find( { 'username' : { '$regex' : req.params.username, '$options' : 'i' } } )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  register: function (req, res) {
    User.findByUsername(req.body.username)
      .then(dbModel => {
        if (dbModel === null) {
          User.register(new User({ username: req.body.username }), req.body.password, function (err) {
            if (err) {
              console.log('error while user register!', err);
              return res.status(422).json(err);
            }
    
            passport.authenticate('local')(req, res, function () {
              if (err) {
                console.log('error while user login!', err);
                return res.status(422).json(err);
              }
              res.json(true);
            });
          });
        }//if dbModel === null
        else {
          res.json(dbModel);
        }
      })
  }
};