let mongoose = require('mongoose')

let expenseSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,default:null},
    expense:{type:String, default:""},
    categoryId:{type:mongoose.Schema.Types.ObjectId,default:null},
    status:{type:Boolean,default:false},
    createdAt:{type:Date, default:Date.now()},
    updatedAt:{type:Date,default:Date.now()}
})

module.exports = mongoose.model("Expense",expenseSchema)