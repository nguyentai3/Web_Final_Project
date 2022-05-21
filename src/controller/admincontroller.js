 
import product_crud from '../sevice/product_crud'
import orders_crud from '../sevice/order_crud'
import crudservice from '../sevice/userservice'
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
    let list = await crudservice.getalluser();
  

    console.log(orderlist)
     res.render("page/Admin_user.ejs",{
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
 
    let produtcs = await product_crud.getAllProduct();
    let orderlist = await orders_crud.showAllorders();

    let result = []


    for (var i =0;i<orderlist.lenght;i++) {

        let product = await product_crud.findProductbyId(orderlist[i].idproduct)
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



    console.log(orderlist)
     res.render("pages/Admin_order.ejs",{
 
 
        orderlist:orderlist
    })
}

module.exports={
    showAllProduct:showAllProduct,
    addnewproduct:addnewproduct,
    updateProduct:updateProduct,
    displayallorder:displayallorder,
    displayallproduct:displayallproduct,
    displayalluser:displayalluser
}