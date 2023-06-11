let mongoose = require("mongoose")
let bcrypt = require("bcrypt")

let userSchema = new mongoose.Schema({
    name:{type:String,default:""},
    email:{type:String,default:""},
    phone:{type:String,default:""},
    password:{type:String,default:""},
    
    isAdmin:{type:Boolean, default:false},
    isIndividual:{type:Boolean, default:false},
    isShopkeeper:{type:Boolean, default:false},

    loginLogs:[{
        ip:{type:String, default:""},
        loginTime:{type:Date,default:Date.now()},
        isLogged:{type:Boolean, default:false}

    }],
    
    status:{type:Boolean,default:true},
    // createdBy:{type:mongoose.Schema.Types.ObjectId, default:null, ref:"User"},
    createdAt:{type:Date,default:Date.now()},
    updatedAt:{type:Date,default:Date.now()},
    
})

module.exports = mongoose.model("User",userSchema)