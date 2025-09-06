var express = require('express');
var router = express.Router();
var register = require("../controllers/authController")

router.post('/register',register)
module.exports = router;