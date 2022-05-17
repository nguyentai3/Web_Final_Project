 
import res from 'express/lib/response'
import producCrud from '../sevice/product_crud'
import ordercrud from '../sevice/order_crud'
import  jwttoken from '../sevice/jwttoken'
import jwt from "jsonwebtoken"
import usercrud from '../sevice/userservice'
let shoppingpage = ()=>{
    return '/pages/Shopping.ejs'
}

let showitem = async(req,res)=>{
    let productlist = await producCrud.getAllProduct()
    let user = await usercrud.getuserbyid(req.body.iduser)

    let token = await jwttoken.createjwttoken(user)
    console.log(token)
    res.status(200).json({
        message:"sản phẩm hiện có",
        productList:productlist,
        tokenuser:token
    })
}

let cartofuser = async (req,res)=> {
    let orderlist = await ordercrud.showAllorders();
    res.status(200).json({
        message:"200",
        order_list:orderlist
    })
}


let addproducttocart = async (req,res) =>{
     
    
     
    let neworder = {
        
        idproduct:parseInt(req.body.idproduct),
        iduser:parseInt(req.body.iduser),
        amount: parseInt(req.body.amount)
    }
     
    await ordercrud.creatneworder(neworder)
    //a[i].dataValues.iduser
    let productlist = await ordercrud.showAllProductInCart(req.body.iduser)
    console.log(productlist)
   // console.log(productlist)
    
    let total =  await  ordercrud.totalcost(productlist)
    total = total.toFixed(2) 
   /* res.json({
        message:"them vao vo hang",
        productlist:productlist ,
        total:total
    })*/
    res.render("pages/Cart.ejs",{
        message:"them vao vo hang",
        iduser:req.body.iduser,
        productlist:productlist ,
        total:total
    })
}

let allProductInCart = async (req,res)=>{
    const decoded =   jwt.verify(req.headers['access-token'], process.env.ACCESS_TOKEN_SECRET);
    let idofuser = decoded.userdata.user.id
    let date = Date()
    let cartOfCart =  await ordercrud.showAllProductInCart(idofuser,date)
    
    console.log(cartOfCart)
    for (let i in cartOfCart) {
        arrayproduct.push({
            nameProduct:i.idproduct,
            amount:i.amount,
        })
    }

    
    /*
      
    res.status(200).json({
        message:"All product",
        product:cartOfCart 
    })   */   
} 


module.exports={
    Allitems:showitem,
    cartofuser:cartofuser,
    cartofuser:allProductInCart,
    allProductInCart:allProductInCart,
    shoppingpage:shoppingpage,
    addproducttocart:addproducttocart
}