import { reject } from "bcrypt/promises";
import db from"../models/index";
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");

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
            await newproduct.save()
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


let updateproduct = async(id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let updateProduct = await db.product.findOne({
                where:{
                    id :id
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

let findProductbyId =   (idproduct)=>{
    
    try {
      
        let product  =   db.product.findOne({
            where :{
                id:idproduct
            }
        })
      
        return product
    } catch(e) {
        return e
    }


    



}

let findProductbyName =  async (name)=>{
    return new Promise(async(resovle,reject)=>{
        try {
           if (name) {
            let product1  = await   db.product.findAll( {
                where:{
                    nameproduct: {
                        // *name* trong query 
                        [Op.regexp]:name
                    }
                }
            });
            
            resovle(product1)
           } else {
            let product1  = await   db.product.findAll();
            
            resovle(product1)
           }
        
            
        } catch(e) {
            reject(e)
        }
    })
   
}



module.exports ={
    updateproduct:updateproduct,
    getAllProduct:getAllProduct,
    addnewproduct:createpruduct,
    findProductbyId:findProductbyId,
    createpruduct:createpruduct,
    findProductbyName:findProductbyName
}