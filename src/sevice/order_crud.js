import db from"../models/index";
import product from '../sevice/product_crud'
let showAllorders = async ()=>{
    let list = await db.order.findAll({
        raw:true
    })
    return {
        list:list
    }

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
 
let creatneworder = async(order) =>{
    return new Promise(async(resolve,reject)=>{
        
        try {
            let newoder  =await db.order.create({
                
                idproduct: order.idproduct,
                iduser:order.iduser,
                amount:order.amount,

            })
            resolve(newoder)
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
            
                let temp =  await  product.findProductbuId(listproduct[i].dataValues.iduser)
                 
                total = total + temp[0].dataValues.cost*listproduct[i].dataValues.amount;
        }
            
            resovle(total)
        }
       
         catch(e) {
            reject(e)
        }
        
    })
}

module.exports = {
    showAllorders:showAllorders,
    findorderbyid:findorderbyid,
    showAllProductInCart:showAllProductInCart,
    creatneworder:creatneworder,
    totalcost:totalcost
}

