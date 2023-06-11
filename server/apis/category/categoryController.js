let Category = require("./categoryModel")

exports.addCategory = (req,res)=>{
    let formData = req.body
    Category.findOne({categoryName:formData.categoryName})
    .then(data=>{
        console.log(data)
        if(data==null){
            let catObj = new Category()
            catObj.userId = formData.userId
            catObj.categoryName = formData.categoryName
            catObj.categoryDesc = formData.categoryDesc
            catObj.categoryGST = formData.categoryGST
            catObj.createdBy = req.decoded.userId
            catObj.save()
            .then(catdata=>{
                console.log(catdata)
                res.json({
                    status:200,
                    success:true,
                    message:"Category Added Successfully.",
                    data:catdata
                })
            })
        }
        else{
            res.json({
                message:"Catgory already exists.",
                success:false,
                status:400
            })
        }
    })
    .catch(err=>{
        res.json({
            message:"Error while adding Category.",
            success:false,
            status:400,
            error:err
        })
    })
}

exports.showCategory = (req,res)=>{
    Category.find()
    .then(cat=>{
        res.json({
            status:200,
            success:true,
            message:"All Categories Displayed.",
            data:cat
        })
    })
    .catch(err=>{
        res.json({
            status:400,
            success:false,
            message:"Error while Displaying All Categories.",
            error:err
        })
    })
}

exports.singleCategory = (req,res)=>{
    if(req.body!=undefined && req.body.id!=undefined){
        Category.findOne({_id:req.body.id})
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

exports.updateCategory = (req,res)=>{
    let toUpdate = {
        categoryName:req.body.categoryName,
        categoryDesc:req.body.categoryDesc,
        categoryGST:req.body.categoryGST
    }
    Category.updateOne({_id:req.body._id},toUpdate)
    .then(obj=>{
        res.json({
            status:200,
            success:true,
            message:"Category Updated Successfully.",
            data:obj
        })
    })
    .catch(err=>{
        res,json({
            status:400,
            success:false,
            message:"Error while updating Category.",
            error:err
        })
    })

}
