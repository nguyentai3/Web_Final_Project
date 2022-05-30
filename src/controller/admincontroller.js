import product_crud from '../sevice/product_crud'
import orders_crud from '../sevice/order_crud'
import crudservice from '../sevice/userservice'
import user_crud from '../sevice/userservice'
import db from '../models'
import uploadfile from '../sevice/uploadfile'
const fs = require('fs');

 
var path = require('path');
const formidable  =require('formidable')


let addnewproduct = async(req,res)=>{
    let productlist = await producCrud.addnewproduct(req.body)
    
    res.status(200).json({
        message:"thêm thành công",
        newProduct:productlist
    })
}

let showAllProduct = async (req,res)=>{
    let productlist = await producCrud.getAllProduct()
    
    res.status(200).json({
        message:"sản phẩm hiện có",
        productList:productlist
    })
}

let updateProduct = async (req,res)=>{
    let newproduct = await product_crud.updateproduct(req.query.idproduct)
    res.status(200).json({
        result:newproduct
    })


}


let displayalluser = async (req,res)=>{
    let list = await crudservice.showAllUser();
    
    

    
     res.render("pages/Admin_user.ejs",{
        datatable:list,
        
    })
}


let displayallproduct = async (req,res)=>{
     
    let produtcs = await product_crud.getAllProduct();

     res.render("pages/Admin_product.ejs",{
 
        productlist:produtcs,
 
    })
}

let displayallorder = async (req,res)=>{
 
    let orderlist = await orders_crud.showAllorders();
     res.render("pages/Admin_order.ejs",{
 
 
        orderlist:orderlist,
        
    })
}
 
let searchuser = async (req,res)=>{
    let user = await user_crud.searchuserbyid(req.body.email)
    return res.render('pages/Admin_user.ejs',{
        datatable:user,
    })
}

let searchproduct = async(req,res)=>{
    let product = await product_crud.findProductbyName(req.body.nameproduct)
    return res.render('pages/Admin_product.ejs',{
        productlist:product,
    })
}

let searchorder = async (req,res)=>{
     
    let order = await orders_crud.findorderbyiduser(req.body.iduser)

    res.render("pages/Admin_order.ejs",{
 
 
        orderlist:order,
        
    })
}


let creatproductpage = async(req,res)=>{
    res.render("pages/Createproduct.ejs")
}

let handlecreateproduct = async (req,res)=>{ 

    let newproduct = {
        nameproduct:req.body.nameproduct,
        quantity:req.body.quantity,
        cost:req.body.cost,
        description:req.body.description
    }
    
        
    
  
     

    await product_crud.createpruduct(newproduct)

    let produtcs = await product_crud.getAllProduct();

     res.render("pages/Admin_product.ejs",{
 
        productlist:produtcs,
 
    })                                    

}

let updateproductpage = async (req,res,next)=>{
    let product = await db.product.findOne({
        where :{
            id:req.query.idproduct
        }
    })
    console.log(product)
    res.render('pages/Updateproductpage.ejs',{
         
        product: product
    })
}
 
let handleproductupdate= async (req,res)=>{
     
    let updateproduct = await db.product.findOne({
        where:{
            id:req.body.idproduct
        }
    })
    updateproduct.set({
        nameproduct:req.body.nameproduct,
        quantity:req.body.quantity,

        cost:req.body.cost,
        description:req.body.description

    })
    await updateproduct.save()
    
    let produtcs = await product_crud.getAllProduct();

     res.render("pages/Admin_product.ejs",{
 
        productlist:produtcs,
 
    })

}

let updateorderpage = async (req,res)=>{
     
    let order = await db.order.findOne({
        where :{
            id:req.query.id
        }
    })
     
    res.render('pages/UpdateOrder.ejs',{
        order: order
    })
}
 
let handleorderupdate= async (req,res)=>{
    let updateorder = await db.order.findOne({
        where:{
            id:req.body.id
        }
    })
   
    await updateorder.set({
        paymentmethob:req.body.paymentmethob

    })
    await updateorder.save()
    
    console.log(updateorder)

    let orderlist = await orders_crud.showAllorders();
    res.render("pages/Admin_order.ejs",{


       orderlist:orderlist,
       
   })

}
let updateorderbyid =async(req,res)=>{

}

let handledeleteorder = async(req,res)=>{
    await db.order.destroy({
        where:{
            id:req.query.id
        }
    })
    
     

    let orderlist = await orders_crud.showAllorders();
    res.render("pages/Admin_order.ejs",{
        orderlist:orderlist,
        
    })
}

let handledeleteproduct = async (req,res)=>{
    await db.product.destroy({
        where:{
            id:req.query.idproduct
        }
    })
    let product = await db.product.findAll()
     res.render("pages/Admin_product.ejs",{
 
 
        productlist:product,
        
    })
}

let handleupload= async (req,res)=>{
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function   (name, file){
         
        file.originalFilename = req.query.idproduct+".jpeg"
        file.filepath = 'C:\\Users\\Dell-3580\\Desktop\\finalweb\\react+node\\Nodejs\\src\\public\\'+file.originalFilename;
        console.log(file.filepath)
    });

    let product = await db.product.findAll()
    res.render("pages/Admin_product.ejs",{


   productlist:product
   
})

}


module.exports={
    handleupload:handleupload,
    showAllProduct:showAllProduct,
    handledeleteorder:handledeleteorder,
    handledeleteproduct:handledeleteproduct,
    addnewproduct:addnewproduct,
    handleorderupdate:handleorderupdate,
    updateorderpage:updateorderpage,
    updateProduct:updateProduct,
    updateorderbyid:updateorderbyid,
    updateproductpage:updateproductpage,
    searchuser:searchuser,
    searchproduct:searchproduct,
    searchorder:searchorder,
    creatproductpage:creatproductpage,
    displayallorder:displayallorder,
    handlecreateproduct:handlecreateproduct,
    displayallproduct:displayallproduct,
    handleproductupdate:handleproductupdate,
    displayalluser:displayalluser 
}