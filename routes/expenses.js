const express = require('express');
const router = express.Router();
const authMiddleware = require ('../middleware/auth')
const {createExpense,getExpenses,getExpenseById,updateExpense,deleteExpense} = require('../controllers/expenseController')

router.post('/create',authMiddleware,createExpense)

router.get('/getexpense',authMiddleware,getExpenses);

router.get('/:id',authMiddleware,getExpenseById)

router.put('/:id',authMiddleware,updateExpense);

router.delete('/:id',authMiddleware,deleteExpense);

module.exports = router;
