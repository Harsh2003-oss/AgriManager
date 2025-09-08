const express = require('express');
const router = express.Router();
var {createFarm} = require("../controllers/farmController") 

router.post('/create',createFarm)

module.exports = router;
