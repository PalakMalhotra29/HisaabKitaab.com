let mongoose = require("mongoose")
let bcrypt = require("bcrypt")
let User = require("../user/userModel")

let customerSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, default:null},
    customerName:{type:String,default:""},
    email:{type:String,default:""},
    password:{type:String,default:""},
    isAdmin:{type:Boolean, default:false},
    isIndividual:{type:Boolean, default:false},
    isShopkeeper:{type:Boolean, default:false},
    status:{type:Boolean,default:true},    
})

module.exports = mongoose.model("Customer", customerSchema)