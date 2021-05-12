const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const { route } = require('./users');

console.log('router loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/settings', require('./settings'));

module.exports = router;