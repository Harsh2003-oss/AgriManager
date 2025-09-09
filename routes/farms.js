const express = require('express');
const router = express.Router();
var {createFarm,getFarms,getFarmsById,updateFarm,deleteFarm} = require("../controllers/farmController") 
const authenticateToken = require("../middleware/auth");

router.post('/create',authenticateToken,createFarm)

router.get('/myfarms',authenticateToken,getFarms)
    


router.get('/:id',authenticateToken,getFarmsById)

router.put('/:id',authenticateToken,updateFarm)

router.delete('/:id',authenticateToken,deleteFarm)

module.exports = router;
