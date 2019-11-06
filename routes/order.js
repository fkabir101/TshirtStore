const router = require('express').Router();
const orderController = require("../controllers/orderController");

router.route('/create')
  .post(orderController.createOrder);

module.exports = router

