const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings_controller');

router.get('/', settingsController.settings);

module.exports = router;