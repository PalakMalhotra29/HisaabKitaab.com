let Sales = require("./saleModel")

exports.addSale = (req,res)=>{
    let formData = req.body
    Sales.findOne({saleId:formData.saleId})
    .then(data=>{
        if(data==null){
            let saleObj = new Sales()
            saleObj.userId = formData.userId
            saleObj.categoryId = formData.categoryId
            saleObj.amountOfOne = formData.amountOfOne
            saleObj.quantity = formData.quantity
            saleObj.totalAmount = formData.totalAmount
            saleObj.save()
            .then(saledata=>{
                res.json({
                    status:200,
                    success:true,
                    message:"Sale Added Successfully.",
                    data:saledata
                })
            })
        }
        else{
            res.json({
                message:"Sale already Added.",
                success:false,
                status:400
            })
        }
    })
    .catch(err=>{
        res.json({
            message:"Error while adding Sale.",
            success:false,
            status:400,
            error:err
        })
    })
}

exports.showSales = (req,res)=>{
    Sales.find()
    .then(sale=>{
        res.json({
            status:200,
            success:true,
            message:"Sales Displayed.",
            data:sale
        })
    })
}

exports.singleSale = (req,res)=>{
    if(req.body!=undefined && req.body.id!=undefined){
        Sales.findOne({_id:req.body.id})
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

exports.updateSales = (req,res)=>{
    let toUpdate = {
        amountOfOne:req.body.amountOfOne,
        quantity:req.body.quantity,
        totalAmount:req.body.totalAmount,
        
    }
    Sales.updateOne({_id:req.body._id},toUpdate)
    .then(obj=>{
        res.json({
            status:200,
            success:true,
            message:"Sales Updated Successfully.",
            data:obj
        })
    })
    .catch(err=>{
        res,json({
            status:400,
            success:false,
            message:"Error while updating Sales.",
            error:err
        })
    })

}