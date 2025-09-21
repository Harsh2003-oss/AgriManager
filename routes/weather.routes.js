const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { getWeatherByFarm } = require('../controllers/weatherController');

router.get('/farm/:farmId', authenticateToken, getWeatherByFarm);

module.exports = router;