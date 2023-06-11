let Purchase = require("./PurchaseModel")

exports.addPurchase = (req,res)=>{
    let formData = req.body
    Purchase.findOne({_id:formData._id})
    .then(data=>{
        if(data==null){
            let purObj = new Purchase()
            purObj.userId = formData.userId
            purObj.categoryId = formData.categoryId
            purObj.amountOfOne = formData.amountOfOne
            purObj.quantity = formData.quantity
            purObj.totalAmount = formData.totalAmount
            purObj.billPaid = formData.billPaid
            purObj.billIssueDate = formData.billIssueDate
            purObj.dueDate = formData.dueDate
            purObj.save()
            .then(purdata=>{
                // console.log(purObj)
                res.json({
                    status:200,
                    success:true,
                    message:"Purchase Added Successfully.",
                    data:purdata
                })
            })
        }
        else{
            res.json({
                message:"Purchase already Added.",
                success:false,
                status:400
            })
        }
    })
    .catch(err=>{
        res.json({
            message:"Error while adding Purchase.",
            success:false,
            status:400,
            error:err
        })
    })
}

exports.showPurchase = (req,res)=>{
    Purchase.find()
    .then(pur=>{
        res.json({
            status:200,
            success:true,
            message:"Purchases Displayed.",
            data:pur
        })
    })
}

exports.singlePurchase = (req,res)=>{
    if(req.body!=undefined && req.body.id!=undefined){
        Purchase.findOne({_id:req.body.id})
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
                error:err
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

exports.updatePurchase = (req,res)=>{
    let toUpdate = {
        billPaid:req.body.billPaid,
    }
    Purchase.updateOne({_id:req.body._id},toUpdate)
    .then(obj=>{
        res.json({
            status:200,
            success:true,
            message:"Purchase Updated Successfully.",
            data:obj
        })
    })
    .catch(err=>{
        res,json({
            status:400,
            success:false,
            message:"Error while updating Purchase.",
            error:err
        })
    })

}