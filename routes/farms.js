const express = require('express');
const router = express.Router();
var {createFarm,getFarms,getFarmsById} = require("../controllers/farmController") 
const authenticateToken = require("../middleware/auth");

router.post('/create',authenticateToken,createFarm)

router.get('/myfarms',authenticateToken,getFarms)
    


router.get('/:id',authenticateToken,getFarmsById)


module.exports = router;
