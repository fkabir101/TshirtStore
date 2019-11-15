const path = require('path');
const router = require('express').Router();

const orderRoutes = require('./order');
const userRoutes = require('./user')


router.use('/orders', orderRoutes);
router.use('/user', userRoutes);

router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
module.exports = router;