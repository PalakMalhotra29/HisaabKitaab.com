let mongoose =  require("mongoose")

let categorySchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,default:null},
    categoryName:{type:String, default:""},
    categoryDesc:{type:String, default:""},
    categoryGST:{type:String, default:""},

    status:{type:Boolean,default:false},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User", default:null},
    createdAt:{type:Date, default:Date.now()},
    updatedAt:{type:Date,default:Date.now()}
})

module.exports = mongoose.model("Category",categorySchema)