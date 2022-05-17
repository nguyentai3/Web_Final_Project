import userservice from '../sevice/userservice'
import jwt from'jsonwebtoken'
import  jwttoken from '../sevice/jwttoken'
import crudservice from"../sevice/crud_user";
import db from '../models';
const querystring = require('query-string')
import producCrud from '../sevice/product_crud'

let loginpage =(req,res) =>{
    res.render("pages/login.ejs")
}


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
    console.log(userdata)
    let token =  jwttoken.createjwttoken(userdata)
       
    token = await jwttoken.createjwttoken(userdata)

    const decode = jwt.decode(token)

     
     

    let productlist = await producCrud.getAllProduct()

     

  /*  res.status(200).json({
        message:"sản phẩm hiện có",
        productList:productlist
    })
    data1:JSON.stringify(data1)
*/
     
    if (userdata.user.roleid ==='USER') {
        console.log(productlist)
        return res.render('pages/Shopping.ejs',{
            id:decode.userdata.user.id,
            token :token,
            productlist :productlist

        })
    } else {
        res.redirect('/crud/get')
    }
    


    
     
}
let handlesignin = async (req,res)=>{
 
    let user ={}

    let message =""
    let token
    let checkemail = await userservice.checkuseremail(req.body.email)
    //kiem tra user co ton tai chua
    let checkuser = await db.User.findOne({
        where:{email:req.body.email}
    })
   if (checkuser) {
        if (!checkemail) {
            user= await crudservice.createuser(req.body)
           message = "dang ky thanh cong"
            token = await jwttoken.createjwttoken(user)
            res.setHeader('Authorization', token); 
            res.header('Authorization', token);
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
    loginpage:loginpage,
    handlesignin:handlesignin
}