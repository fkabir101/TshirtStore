const mongoose = require('mongoose');
const db = require('../models');

module.exports = {
  createOrder : function(req, res){
    db.Orders
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}