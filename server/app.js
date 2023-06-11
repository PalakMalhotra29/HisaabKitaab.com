const express = require('express')
const app = express()

const db = require("./config/db")

app.use(express.urlencoded({extended:true}))

let seed = require("./common/seed")

const adminroutes = require("./routes/adminroutes")
app.use("/admin",adminroutes)

app.get("/",function(req,res){
    res.json({
        status:200,
        success:true,
        message:"Welcome to HisaabKitaab.com"
    })
})

app.listen(3000, function(){
    console.log("Server Running at 3000.")
})