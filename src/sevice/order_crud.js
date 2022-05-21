import { promise, reject } from "bcrypt/promises";
import db from"../models/index";
 
import product from '../sevice/product_crud'
 
let showAllorders = async ()=>{
    let list = await db.order.findAll({
        raw:true
    })
    return list
    

}

let findorderbyid= async(idorder) =>{

   return new Promise(async(resovle,reject)=>{
    try {
        let order = await db.order.findOne({
            where:{
                id:idorder
            }
        })
        if (order) {
            resovle(order)
        } else {
            resovle({
                message:"invalid id order"
            }) 
        }
    } catch(e) {
        reject(e)
    }
   })
   
}
 
let creatneworder = async(updateorder) =>{
    return new Promise(async(resolve,reject)=>{
        
        try {
            let order = await db.order.findOne({
                where:{
                    idproduct:updateorder.idproduct,
                    iduser:updateorder.iduser
                }
            })
            let product = await db.product.findOne({
                where:{
                    id:updateorder.idproduct
                }
            })

            if (order) {
                order.amount = updateorder.amount
                product.amount -= order.amount
                await product.save()
                let a = await order.save()
                resolve(a)
            } else {
                let newoder  =await db.order.create({
                
                    idproduct: updateorder.idproduct,
                    iduser:updateorder.iduser,
                    amount:updateorder.amount,
    
                })
                resolve(newoder)
            }

        } catch(e) {
            reject(e)
        }
    })
}

let showAllProductInCart = async(iduser,date)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let cart = await db.order.findAll(
              {
                where: {
                    iduser:iduser,
                }
              }
            )
           // console.log("cart ",cart)
            resolve(cart)
        } catch(e) {
            reject(e)
        }
    })
}

let totalcost = async (listproduct) =>{
    
    return new Promise(async(resovle,reject)=>{
        try {
            let total = 0
            
            for (var i = 0 ;i<listproduct.length;i++) {
            
               let product = await db.product.findOne({
                   where:{
                       id:listproduct[i].dataValues.idproduct
                   }
               })
                
                total = total +  product.cost*listproduct[i].dataValues.amount;
        }
            
            resovle(total)
        }
       
         catch(e) {
            reject(e)
        }
        
    })
}

let productlistofcart =async (order) =>{
    return new Promise(async (resolve,reject)=>{
        try {
            let result = []
            for (var i =0;i<order.length;i++) {
                let product = await db.product.findOne({
                    where:{
                        id:order[i].dataValues.idproduct
                    }
                })
                 
                result.push({
                    Name: product.dataValues.nameproduct,
                    cost:(order[i].dataValues.amount *product.dataValues.cost).toFixed(2),
                    amount:order[i].dataValues.amount,
                    description:product.dataValues.description
                })
            }
            resolve(result)
        } catch(e) {
            reject(e)
        }
       
    })
}

module.exports = {
    showAllorders:showAllorders,
    findorderbyid:findorderbyid,
    showAllProductInCart:showAllProductInCart,
    creatneworder:creatneworder,
    totalcost:totalcost,
    productlistofcart:productlistofcart
}