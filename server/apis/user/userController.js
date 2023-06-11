let User = require("./userModel")

let bcrypt = require("bcrypt")
let jwt = require('jsonwebtoken')
let secretkey = "HisaabKitaab"
const saltRounds=10
let Customer = require('../customer/customerModel')


exports.login = (req,res)=>{
    User.findOne({email:req.body.email})
    // .populate("userId")
    .then(data=>{
        let logger ={
        ip:req.ip,
        isLogged:false
        }
        if(data!=null){
            if(bcrypt.compareSync(req.body.password,data.password)){
                logger.islogged = true
                data.loginLogs.push(logger)
                data.save()
                let payload = {
                    email:data.email,
                    isIndividual:data.isIndividual,
                    isShopkeeper:data.isShopkeeper,
                    isAdmin:data.isAdmin,
                    // userId:data._id
                }
                let token = jwt.sign(payload,secretkey)
                res.json({
                    status:200,
                    success:true,
                    message:"Logged in Successfully.",
                    data:data,
                    token:token
                })
            }
            else{
                data.loginLogs.push(logger)
                res.json({
                    status:400,
                    success:false,
                    message:"Invalid Username or Password."
                })
            }
        }
        else{
            res.json({
                status:400,
                success:false,
                message:"User Not Found."
            })
        }
           
    })
}

exports.addUser = (req,res)=>{
    let formData = req.body
    User.findOne({email:formData.email})
    .then(data=>{
        if(data==null){
            let userObj = new User()
            userObj.name = formData.name
            userObj.email = formData.email
            userObj.phone = formData.phone
            userObj.save()
            .then(data=>{
                let custId = data._id
                let custObj = new Customer()
                custObj.custId = custId 
                custObj.email = formData.email
                custObj.password = bcrypt.hashSync(formData.password,saltRounds)
                custObj.isIndividual = true
                custObj.save()
                .then(userdata=>{
                    res.json({
                        message:"Customer Registered Successfully.",
                        success:true,
                        status:200,
                        data:data,
                        userdata:userdata
                    })
                })
                .catch(err=>{
                    res.json({
                        message:"Server-Side error while registration.",
                        success:false,
                        status:400,
                        error:err
                    })
                })
            })
        }
        else{
            res.json({
                message:"User already exists.",
                success:false,
                status:400
            })
        }
    })
    .catch(err=>{
        res.json({
            message:"Error while registering.",
            success:false,
            status:400,
            error:err
        })
    })
}

exports.showUser = (req,res)=>{
    User.find()
    .then(use=>{
        res.json({
            status:200,
            success:true,
            message:"All Users Displayed.",
            data:use
        })
    })
}

exports.singleUser = (req,res)=>{
    if(req.body!=undefined && req.body.id!=undefined){
        User.findOne({_id:req.body.id})
        .then(data=>{
            if(data!=null){
                res.json({
                    status:200,
                    message:"Data Loaded.",
                    data:data
                })
            }
        })
        .catch(err=>{
            res.json({
                status:400,
                success:false,
                message:"Error while displaying the data.",
                erroe:err
            })
        })
    }
    else{
        res.json({
            status:400,
            success:false,
            message:"Please Enter an Id to Proceed."
        })
    }
}

exports.updateUser = (req,res)=>{
    console.log(req.body)
    let toUpdate = {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password
    }
    User.updateOne({_id:req.body._id},toUpdate)
    .then(obj=>{
        res.json({
            status:200,
            success:true,
            message:"User Updated Successfully.",
            data:obj
        })
    })
    .catch(err=>{
        res,json({
            status:400,
            success:false,
            message:"Error while updating User.",
            error:err
        })
    })

}
