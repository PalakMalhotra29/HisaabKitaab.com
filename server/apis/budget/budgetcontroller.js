let Budget = require("./budgetModel")

exports.addbudget = (req,res)=>{
    let formData = req.body
    Budget.findOne({totalBudget:formData.totalBudget})
    .then(data=>{
        if(data==null){
            let budObj = new Budget()
            budObj.userId = formData.userId
            budObj.totalBudget = formData.totalBudget
            budObj.budgetDesc = formData.budgetDesc
            budObj.save()
            .then(buddata=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Budget Added Successfully.",
                    data:buddata
                })
            })
        }
        else{
            res.json({
                message:"Budget already Added.",
                success:false,
                status:400
            })
        }
    })
    .catch(err=>{
        res.json({
            message:"Error while adding Budget.",
            success:false,
            status:400,
            error:err
        })
    })
}

exports.showbudget = (req,res)=>{
    Budget.find()
    .then(bud=>{
        res.json({
            status:200,
            success:true,
            message:"Budget Displayed.",
            data:bud
        })
    })
}

exports.singleBudget = (req,res)=>{
    if(req.body!=undefined && req.body.id!=undefined){
        Budget.findOne({_id:req.body.id})
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

exports.updateBudget = (req,res)=>{
    let toUpdate = {
        totalBudget:req.body.totalBudget,
        budgetDesc:req.body.budgetDesc
        
    }
    Budget.updateOne({_id:req.body._id},toUpdate)
    .then(obj=>{
        res.json({
            status:200,
            success:true,
            message:"Budget Updated Successfully.",
            data:obj
        })
    })
    .catch(err=>{
        res,json({
            status:400,
            success:false,
            message:"Error while updating Budget.",
            error:err
        })
    })

}