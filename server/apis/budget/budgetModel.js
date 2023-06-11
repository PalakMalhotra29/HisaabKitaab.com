let mongoose =  require("mongoose")

let budgetSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:"User"},
    totalBudget:{type:Number, default:0},
    budgetDesc:{type:String, default:""},

    status:{type:Boolean,default:false},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User", default:null},
    createdAt:{type:Date, default:Date.now()},
    updatedAt:{type:Date,default:Date.now()}
})

module.exports = mongoose.model("Budget",budgetSchema)