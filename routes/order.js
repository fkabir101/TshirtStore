const router = require('express').Router();
const orderController = require("../controllers/orderController");

router.route('/findAll')
  .get(orderController.getOrders);

router.route('/update/:id')
  .put(orderController.update)
  .delete(orderController.remove)

module.exports = router

