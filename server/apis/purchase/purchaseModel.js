let mongoose =  require("mongoose")

let purchaseSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:"User"},
    categoryId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:"Category"},
    amountOfOne:{type:Number, default:0},
    quantity:{type:Number, default:0},
    totalAmount:{type:Number, default:0},
    billPaid:{type:Boolean, default:false},
    billIssueDate:{type:Date, default:Date.now()},
    dueDate:{type:Date, default:Date.now()},

    status:{type:Boolean,default:false},
    createdBy:{type:mongoose.Schema.Types.ObjectId, default:null,ref:"User"},
    createdAt:{type:Date, default:Date.now()},
    updatedAt:{type:Date,default:Date.now()}
})

module.exports = mongoose.model("Purchase",purchaseSchema)