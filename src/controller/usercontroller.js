import userservice from '../sevice/userservice'
import jwt from'jsonwebtoken'
import  jwttoken from '../sevice/jwttoken'
import crudservice from"../sevice/crud_user";
 const querystring = require('query-string')
import producCrud from '../sevice/product_crud'

 
  import orders_crud from '../sevice/order_crud'
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
    
    console.log(token)

    token = await jwttoken.createjwttoken(userdata)

    const decode = jwt.decode(token)

    let productlist = await producCrud.getAllProduct()
    
    
    if (userdata.user.roleid ==='USER') {
        return res.render('pages/Shopping.ejs',{
            id:decode.userdata.user.id,
            token :token,
            productlist :productlist
    
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

    console.log(token)

    console.log(orderlist)
     res.render("displayuserlist.ejs",{
        datatable:list,
        productlist:produtcs,
        orderlist:orderlist,
        token:token
    })  
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