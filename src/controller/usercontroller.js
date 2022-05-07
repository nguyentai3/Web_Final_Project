import userservice from '../sevice/userservice'
import jwt from'jsonwebtoken'
import  jwttoken from '../sevice/jwttoken'
import crudservice from"../sevice/crud_user";
import db from '../models';

let handlelogin = async (req,res)=>{
    let email  = req.body.email
    let password = req.body.password 
     
    //check missing inputs
    if (!email || !password) {
        return res.status(500).json({
            errcode:1,
            message:"missing input"
        })
    }
    //check email exist

    let userdata  = await userservice.handleuserlogin(email,password)

    let token =  jwttoken.createjwttoken(userdata)
  /*  let options = {
        path:"/",
        sameSite:true,
        maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
        httpOnly: true,  
    }*/
     
    let decode = jwt.decode(token)
    console.log(decode)
    console.log(decode.userdata.message)
    return res.status(200).json({
        
        message: userdata.message,
        token:token
    })
}
let handlesignin = async (req,res)=>{
  /*
                email: data.email,
                firstname:  data.firstname,
                lastname:  data.lastname,
                 password:password1,
                address:  data.address,
                gender: data.gender === '1' ? true:false,
                phone: data.phone,
                roleid:  "USER"

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyZGF0YSI6eyJtZXNzYWdlIjoiZW1haWwgaGFzIGV4aXN0ZWQiLCJyb2xlaWQiOiJVU0VSIn0sImlhdCI6MTY1MTgyMDU0MywiZXhwIjoxNjUxODMwNTQzfQ.Ur2-ez83GG2orL7YmCHraZ_nsPbhifa_slbI5ane9kg


  */
    let user ={}

    let message =""
    let token
    let checkemail = await userservice.checkuseremail(req.body.email)
    let checkuser = await db.User.findOne({
        where:{email:req.body.email}
    })
    if (checkuser) {
        if (!checkemail) {
            user= await crudservice.createuser(req.body)
           message = "dang ky thanh cong"
            token = await jwttoken.createjwttoken(user)
   
       } else {
           message = "email has existed"
       }
    } else {
        message:"this account has existed"
    }
   
    
    let decode = jwt.decode(token)
    console.log(decode)
    res.status(200).json({
         message:message,
         
        token: token

    })
}
module.exports={
    handlelogin:handlelogin,
    handlesignin:handlesignin
}