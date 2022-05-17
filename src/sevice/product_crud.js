import { reject } from "bcrypt/promises";
import db from"../models/index";

let getAllProduct = async () =>{
    return new Promise(async(resolve,reject)=>{
        try {
            let productlist = await db.product.findAll()
             
            resolve(productlist)
        } catch(e) {
            reject(e)
        }
    })
}
let createpruduct = async (product) =>{
    return new Promise(async (resolve,reject)=>{
        try {
            let newproduct = await db.product.create({
                nameproduct: product.nameproduct,
                quantity: product.quantity,
                cost:product.cost,
                description:product.description
            })
            resolve(newproduct)
        } catch(e) {
            reject(e)
        }

    })
}

let isdeleteproduct = async(product)=>{
    if (product.quantity == 0 && product.description =="stop selling it") {
        await db.product.delete()
    }
}


let updateproduct = async(newproduct)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let updateProduct = await db.product.findOne({
                where:{
                    id :newproduct.id
                }
            })
            if (updateProduct) {
                updateProduct.nameproduct = newproduct.nameproduct
                updateProduct.quantity = newproduct.quantity
                updateProduct.cost = newproduct.cost
                updateProduct.description = newproduct.description
                await updateProduct.save()
            } else {
                resolve({message:"Dell có product này"})
            }
            resolve({message:'update success',newProduct:updateProduct})
        } catch(e) {
            reject(e)
        }
    })
}

let findProductbuId =   (idproduct)=>{
    
        try {
          
            let product  =   db.product.findAll({
                where :{
                    id:idproduct
                }
            })
          
            return product
        } catch(e) {
            return e
        }


        


    
}


module.exports ={
    updateproduct:updateproduct,
    getAllProduct:getAllProduct,
    addnewproduct:createpruduct,
    findProductbuId:findProductbuId
}