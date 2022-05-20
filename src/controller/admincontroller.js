 
import producCrud from '../sevice/product_crud'




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


let allproduct = async(req,res)=>{
    
}

module.exports={
    showAllProduct:showAllProduct,
    addnewproduct:addnewproduct,
    updateProduct:updateProduct
}