let Expense = require("./expenseModel")

exports.addExpense = (req,res)=>{
    let formData = req.body
    Expense.findOne({expense:formData.expense})
    .then(data=>{
        if(data==null){
            let expObj = new Expense()
            expObj.userId = formData.userId
            expObj.expense = formData.expense
            expObj.categoryId = formData.categoryId
            expObj.save()
            .then(expdata=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Expense Added Successfully.",
                    data:expdata
                })
            })
        }
        else{
            res.json({
                message:"Expense already Added.",
                success:false,
                status:400
            })
        }
    })
    .catch(err=>{
        res.json({
            message:"Error while adding Expense.",
            success:false,
            status:400,
            error:err
        })
    })
}

exports.showExpense = (req,res)=>{
    Expense.find()
    .then(exp=>{
        res.json({
            status:200,
            success:true,
            message:"All Expenses Displayed.",
            data:exp
        })
    })
}

exports.singleExpense = (req,res)=>{
    if(req.body!=undefined && req.body.id!=undefined){
        Expense.findOne({_id:req.body.id})
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

exports.updateExpense = (req,res)=>{
    let toUpdate = {
        expense:req.body.expense,
    }
    Expense.updateOne({_id:req.body._id},toUpdate)
    .then(obj=>{
        res.json({
            status:200,
            success:true,
            message:"Expense Updated Successfully.",
            data:obj
        })
    })
    .catch(err=>{
        res,json({
            status:400,
            success:false,
            message:"Error while updating Expense.",
            error:err
        })
    })

}