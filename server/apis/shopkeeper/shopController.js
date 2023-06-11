let ShopKeeper = require("./shopModel")
let bcrypt = require("bcrypt")
let jwt = require('jsonwebtoken')
let secretkey = "HisaabKitaab"
const saltRounds=10;

// exports.login = (req,res)=>{
//     ShopKeeper.findOne({email:req.body.email})
//     // .populate("userId")
//     .then(data=>{
//         let logger ={
//         ip:req.ip,
//         isLogged:false
//         }
//         if(data!=null){
//             if(bcrypt.compareSync(req.body.password,data.password)){
//                 logger.isLogged = true
//                 data.loginLogs.push(logger)
//                 data.save()
//                 let payload = {
//                     email:data.email,
//                     isIndividual:data.isIndividual,
//                     isShopkeeper:data.isShopkeeper,
//                     isAdmin:data.isAdmin,
//                     userId:data._id
//                 }
//                 let token = jwt.sign(payload,secretkey)
//                 res.json({
//                     status:200,
//                     success:true,
//                     message:"Logged in Successfully.",
//                     data:data,
//                     token:token
//                 })
//             }
//             else{
//                 data.loginLogs.push(logger)
//                 res.json({
//                     status:400,
//                     success:false,
//                     message:"Invalid Username or Password."
//                 })
//             }
//         }
//         else{
//             res.json({
//                 status:400,
//                 success:false,
//                 message:"ShopKeeper Not Found."
//             })
//         }
           
//     })
// }

exports.addShopkeeper = (req,res)=>{
    // console.log("Hello")
    let formData = req.body
    ShopKeeper.findOne({email:formData.email})
    .then(data=>{
        // console.log("Hello")
        if(data==null){
            // console.log("Hello")
            let shopObj = new ShopKeeper()
            shopObj.name = formData.name
            shopObj.email = formData.email
            shopObj.phone = formData.phone
            shopObj.save()
            .then(data=>{
                // console.log("Hello")
                let custId = data._id
                let shObj = new ShopKeeper()
                shObj.custId = custId 
                shObj.name = formData.name
                shObj.email = formData.email
                shObj.phone = formData.phone
                shObj.password = bcrypt.hashSync(formData.password,saltRounds)
                shObj.isShopkeeper = true
                shObj.save()
                .then(shopdata=>{
                    console.log("Hello")
                    res.json({
                        message:"ShopKeeper Registered Successfully.",
                        success:true,
                        status:200,
                        data:data,
                        data:shopdata
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
                message:"ShopKeeper already exists.",
                success:false,
                status:400
            })
        }
    })
    .catch(err=>{
        console.log(err)
        res.json({
            message:"Error while registering.",
            success:false,
            status:400,
            error:err
        })
    })
}

exports.showShopkeeper = (req,res)=>{
    ShopKeeper.find()
    .then(use=>{
        res.json({
            status:200,
            success:true,
            message:"All Shopkeepers Displayed.",
            data:use
        })
    })
}

exports.singleShop = (req,res)=>{
    if(req.body!=undefined && req.body.id!=undefined){
        ShopKeeper.findOne({_id:req.body.id})
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

exports.updateShop = (req,res)=>{
    let toUpdate = {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone
    }
    ShopKeeper.updateOne({_id:req.body._id},toUpdate)
    .then(obj=>{
        console.log(obj)
        res.json({
            status:200,
            success:true,
            message:"Shop Updated Successfully.",
            data:obj
        })
    })
    .catch(err=>{
        res,json({
            status:400,
            success:false,
            message:"Error while updating shopkeeper.",
            error:err
        })
    })

}
