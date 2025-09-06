var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Home API endpoint working!' });
});
module.exports = router;