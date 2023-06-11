let mongoose =  require("mongoose")

let saleSchema = new mongoose.Schema({
    saleId:{type:Number,default:0},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:"User"},
    categoryId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:"Category"},
    amountOfOne:{type:Number, default:0},
    quantity:{type:Number, default:0},
    totalAmount:{type:Number, default:0},

    status:{type:Boolean,default:false},
    createdBy:{type:mongoose.Schema.Types.ObjectId, default:null,ref:"User"},
    createdAt:{type:Date, default:Date.now()},
    updatedAt:{type:Date,default:Date.now()}
})

module.exports = mongoose.model("Sales",saleSchema)