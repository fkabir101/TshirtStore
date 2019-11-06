const path = require('path');
const router = require('express').Router();

const orderRoutes = require('./order');

router.use('/orders', orderRoutes);
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
module.exports = router;