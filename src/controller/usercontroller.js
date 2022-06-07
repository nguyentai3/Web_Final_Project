import ngrok from 'ngrok'
import userservice from '../sevice/userservice'
import jwt from'jsonwebtoken'
import  jwttoken from '../sevice/jwttoken'
import crudservice from"../sevice/crud_user";
 const querystring = require('query-string')
import producCrud from '../sevice/product_crud'
import orders_crud from '../sevice/order_crud'
import db from '../models';
var time = require('timers');
import zalopay from '../sevice/payment' 
let loginpage =(req,res) =>{
    res.render("pages/login.ejs",{
        message:""
    })
}

let handlelogin = async (req,res)=>{
    let email  = req.body.email
    let password = req.body.password 
     
    //check missing inputs
    if (!email || !password) {
        return res.render('pages/login.ejs',{
            message:"missing input"
    
        })
    }
    //check email exist

    let userdata  = await userservice.handleuserlogin(email,password)
     
    /*
         userdata.errcode=4
                        userdata.message="password is wrong"
                         
                        resovle(userdata)
    */
    if (userdata.errcode == 4) {
        return res.render('pages/login.ejs',{
            message:userdata.message
    
        })
    } else { 
    console.log(userdata)
    let token =  jwttoken.createjwttoken(userdata)
    token = await jwttoken.createjwttoken(userdata)

    const decode = jwt.decode(token)

    let productlist = await producCrud.getAllProduct()
    console.log(decode)
    if (userdata.user.roleid ==='USER') {
        return res.render('pages/Shopping.ejs',{
            id:decode.userdata.user.id,
            token :token,
            productlist :productlist,
            message:"",
            name :decode.userdata.user.firstname
    
        })
    } else   {
        let list = await crudservice.getalluser();
        let produtcs = await producCrud.getAllProduct();
        let orderlist = await orders_crud.showAllorders();
        let result = []
        for (var i =0;i<orderlist.lenght;i++) {
        let product = await producCrud.findProductbyId(orderlist[i].idproduct)
        let cost = product.dataValues.cost * orderlist[i].amount

        result.push({
            id: orderlist[i].id,
            iduser: orderlist[i].iduser,
            idproduct: orderlist[i].idproduct,
            amount: orderlist[i].amount,
            paymentmethob: orderlist[i].paymentmethob,
            createdAt: orderlist[i].createdAt,
            cost: cost
        })
    }
    
      res.render("displayuserlist.ejs",{
        datatable:list,
        productlist:produtcs,
        orderlist:orderlist,
        token:token
    })  
    } 
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
 
    if (req.body.email && req.body.password) {
        
    let userdata = {
                email: req.body.email,
                firstname:  req.body.firstname,
                lastname:  req.body.lastname,
                password:req.body.password,
                address:  req.body.address,
                gender: req.body.gender ,
                phone: req.body.phone,
                
    }
 
    let user = await crudservice.createuser(userdata)
    if (user.message==="success") {
        console.log(user)
        let token =  jwttoken.createjwttoken(user.data)
    token = await jwttoken.createjwttoken(user.data)

    const decode = jwt.decode(token)

        let productlist = await producCrud.getAllProduct()
     
        console.log(productlist)
        return res.render('pages/Shopping.ejs',{
            id:user.data.dataValues.id,
            token :token,
            productlist :productlist,
            name:user.data.dataValues.firstname
        })
        } else {
        res.render('pages/Signin.ejs',{
            message:"email has exited"
        })
        }
    } else {
        res.render("pages/Signin.ejs",{
            message:"missing inputs"
        })
    }

 
}
 
let pay = async(req,res,next)=>{
    res.render('pages/payment_page.ejs')
 }
let signin = (req,res)=>{
    res.render("pages/Signin.ejs",{
        message:""
    })
}

let cancleorer = async(req,res) =>{
    
    await orders_crud.deleteorder(req.query.idorder)
     
    let productlist = await orders_crud.showAllProductInCart(req.query.iduser)
     
    let result = await orders_crud.productlistofcart(productlist)

    let total =  await  orders_crud.totalcost(productlist)
    total = total.toFixed(2) 
   /* res.json({
        message:"them vao vo hang",
        productlist:productlist ,
        total:total
    })*/
     
    res.render("pages/Cart.ejs",{
         
        iduser:req.query.iduser,
        productlist:result ,
        total:total
    }) 

}

let pagesuccess = (req,res)=>{
    res.render("pages/success.html")
}

let paypages =  async  (req,res)=>{
    
    res.render('pages/paymentpage.ejs')
   
}

let handlepayment = async(req,res)=>{
     
    let a = await zalopay.createorder(req.body.amout,req.body.description)
    console.log("handlepayment  ",a)
}

let chatrealtimepage = (req,res)=>{

    console.log(req.query.id)






    res.render('pages/chatrealtime.ejs')
}


module.exports={
    paypages:paypages,
    chatrealtimepage:chatrealtimepage,
    handlepayment:handlepayment,
    pagesuccess:pagesuccess,
    handlelogin:handlelogin,
    loginpage:loginpage,
    handlesignin:handlesignin,
    cancleorer:cancleorer,
    signin:signin ,
    pay:pay
}