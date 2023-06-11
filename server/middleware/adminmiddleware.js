let jwt = require("jsonwebtoken")
let secretkey = "HisaabKitaab"

module.exports=(req,res,next)=>{
    let auth = req.headers['authorization']
    if(auth==undefined || auth==null){
        res.json({
            status:401,
            status:false,
            message:"Unauthorized Access."
        })
    }
    else{
        jwt.verify(auth,secretkey,(err,decoded)=>{
          if(err){
            console.log(err)
            res.json({
                status:401,
                success:false,
                message:"Token Error."
            })
          }
          else{
            req.decoded = decoded
            next()
          }  
        })
    }
}