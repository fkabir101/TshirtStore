const mongoose = require('mongoose');
const db = require('../models');

module.exports = {
  getOrders : function(req, res){
    db.Orders
      .find()
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });
  },
  update: function (req, res) {
    db.Orders
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Orders
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
}