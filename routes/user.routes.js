var express = require('express');
var router = express.Router();
var {registerUser,login} = require("../controllers/authController")

router.post('/register',registerUser)

router.post('/login',login)

module.exports = router;