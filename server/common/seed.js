let User = require("../apis/user/userModel")
let bcrypt = require("bcrypt")
const saltRounds = 10

let userObj = {
    name:"Admin",
    email:"impalak220@gmail.com",
    phone:"8264456475",
    password:bcrypt.hashSync("admin123",saltRounds)
}
User.findOne({email:userObj.email})
.then(data=>{
   if(data==null){
    let userObj2 = new User(userObj)
    userObj2.save()
    .then(data=>{
        console.log("Admin Registered.")
    })
   }
})