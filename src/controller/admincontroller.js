import product_crud from '../sevice/product_crud'
import orders_crud from '../sevice/order_crud'
import crudservice from '../sevice/userservice'
import user_crud from '../sevice/userservice'

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
    let newproduct = await producCrud.updateproduct(req.body)
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

 



module.exports={
    showAllProduct:showAllProduct,
    addnewproduct:addnewproduct,
    updateProduct:updateProduct,
    searchuser:searchuser,
    searchproduct:searchproduct,
    searchorder:searchorder,
    creatproductpage:creatproductpage,
    displayallorder:displayallorder,
    handlecreateproduct:handlecreateproduct,
    displayallproduct:displayallproduct,
    displayalluser:displayalluser 
}