const express = require('express');
const router = express.Router();
const {createCrop,getCrops,getCropsById,updateCrop,deleteCrop} = require('../controllers/cropController');
const authMiddleware = require('../middleware/auth');

router.post('/create',authMiddleware,createCrop);

router.get('/mycrops',authMiddleware,getCrops);

router.get('/:id',authMiddleware,getCropsById);

router.put('/:id',authMiddleware,updateCrop);

router.delete('/:id',authMiddleware,deleteCrop);

module.exports = router;
