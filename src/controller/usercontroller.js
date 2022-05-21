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
     
    let token =  jwttoken.createjwttoken(userdata)
       
    token = await jwttoken.createjwttoken(userdata)

    const decode = jwt.decode(token)

    let productlist = await producCrud.getAllProduct()
    
     console.log(userdata.user.roleid)
    
    
    if (decode.userdata.user.roleid ==='USER') {
        return res.render('pages/Shopping.ejs',{
            id:decode.userdata.user.id,
            token :token,
            productlist :productlist
    
        })
      
    } else   {
        res.redirect('/crud/get')   
    } 
    
       /* 
    res.status(200).json({
        message:"sản phẩm hiện có",
        productList:productlist
    })
    data1:JSON.stringify(data1)
*/
}
let handlesignin = async (req,res)=>{
 
    let userdata = {
                email: req.body.email,
                firstname:  req.body.firstname,
                lastname:  req.body.lastname,
                password:req.body.password,
                address:  req.body.address,
                gender: req.body.gender ,
                phone: req.body.phone,
                
    }
    console.log(userdata)

    let user = await userservice.createuser(userdata)
    
    console.log(user)
    
}

let signin = (req,res)=>{
    res.render("pages/Signin.ejs")
}


module.exports={
    handlelogin:handlelogin,
    loginpage:loginpage,
    handlesignin:handlesignin,
    signin:signin
}