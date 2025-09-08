const express = require('express');
const router = express.Router();
var {createFarm} = require("../controllers/farmController") 

router.post('/create',createFarm)

router.get('/',function(req,res){
    res.json({message:"Farms API endpoint working!"})
});



module.exports = router;
