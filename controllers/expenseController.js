
const expenseModel = require('../models/Expense');

const createExpense = async (req,res) =>{
    try {
                console.log("Request body:", req.body);
        console.log("User from middleware:", req.user);
    const{amount,description,category,farm,date} = req.body;

if(!amount|| !description || !category ||!farm ||!date){
    res.status(400).json({error:"Please fill all the fields"})
}



    const expense = new expenseModel({
        amount,
        description,
        category,
        owner:req.user.userId,
        date,
        farm

    });
  
    await expense.save()

   return res.status(201).json({
            message:"Expense created successfully",
            expense
        })
} catch (error) {
            console.log("Actual error:", error);
    res.status(500).json({ error: 'Failed to create expense' });
}

}

const getExpenses = async(req,res) => {

    try {
        
    

    const expense = await expenseModel.find({owner:req.user.userId})

    if(!expense){
     return   res.status(500).json({error:"no expense found"})
    }

   return res.status(200).json({
    message:"all expenses",
    expense
   })
}
 catch (error) {
        res.status(500).json({error:"error finding expenses"})
    }

}


const getExpenseById = async (req,res) => {

    const expense = await expenseModel.findById(req.params.id)

    if(!expense){
        return res.status(400).json({error:"no expense found"})
    }

    return res.status(200).json({
        message:"expenses",
        expense
    })
}

const updateExpense = async(req,res) => {
    try {
        console.log(req.body)
         const{amount,description,category,farm,date} = req.body;

const expense = await expenseModel.findById(req.params.id)
console.log(expense)
  if(!expense){
            return res.status(404).json({error:"Expense not found"})
        }

        if(expense.owner.toString() !== req.user.userId){
    return res.status(401).json({error:"You are not authorized to update this expense"})
}

expense.amount = amount;
expense.description = description;
expense.category = category;
expense.farm = farm;
expense.date = date;

await expense.save();

 return res.status(200).json({
            message: "Expense updated successfully",
            expense
        });

    } catch (error) {
        console.log("actual error",error)
         res.status(500).json({ error: 'Failed to update expense' });
    }
}

const deleteExpense = async (req,res) => {
    try {
 
        const expense = await expenseModel.findById(req.params.id);
        if(!expense){
            return res.status(404).json({error:"Expense not found"})
        }
        if(expense.owner.toString() !== req.user.userId){
            return res.status(403).json({error:"You are not authorized to delete this expense"})
        }
        await expenseModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message:"Expense deleted successfully"
        })

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


module.exports = {createExpense,getExpenses,getExpenseById,updateExpense,deleteExpense}