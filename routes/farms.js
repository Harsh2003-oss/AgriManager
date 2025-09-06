const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Farms API endpoint working!' });
});

module.exports = router;
