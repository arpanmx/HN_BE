const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const thingRoutes = require('./things');
const essayRoutes = require('./essay');

router.use('/users', userRoutes);
router.use('/things', thingRoutes);
router.use('/essay', essayRoutes);

module.exports = router;
