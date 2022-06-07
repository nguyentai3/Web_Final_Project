const bcrypt = require('bcrypt');
const { reject } = require('bcrypt/promises');
import db from"../models/index";
 var salt =bcrypt.genSalt(100)
 
 let createuser = async (data)=>{
     return new Promise(async(resovle,reject)=>{

        try {
            let password1 = await hashpassword(data.password)
            let email = await db.User.findOne({
                where:{
                    email:data.email
                }
            })
            if (email) {
                resovle({messgage:"Email has exited"})
            } else {
                let newuser= await db.User.create({
                    email: data.email,
                    firstname:  data.firstname,
                    lastname:  data.lastname,
                    password:password1,
                    address:  data.address,
                    gender: data.gender === '1' ? true:false,
                    phone: data.phone,
                    roleid:  "USER"
                    
                }) 
                 
                resovle({
                    data:newuser,
                    message:'success'
                })
            }
           
        }catch(e) {
            reject(e)
        }
     })
     
     
  
 }

 let hashpassword = (password) => {
    return new Promise(async(resovle,reject)=>{
        try {
            var hash = await bcrypt.hash(password, parseInt(salt));
            resovle(hash);
        } catch(e) {
            reject(e)    
        }
    })
 }
let getalluser = ()=>{
    return new Promise(async(resovle,reject)=>{
        try {
            let userlist = await db.User.findAll({
                raw:true
            });
            resovle(userlist)
        }catch(e){
            reject(e)
        }
    })
}

let getuserbyid =  (id)=>{
    return new Promise( async(resolve,reject)=>{
        try {
            let userdata  = await db.User.findOne({where: {id:id}})
            resolve(userdata)

        }
        catch(e) {
            reject(e)
        }
        
    })

   // return id
}


let checkuserbyid =(id) =>{
    return new Promise(async(resolve,reject)=>{
        
        
        try {
        let userdata  =await db.User.findOne({where:{id:id},raw:true })
            if (userdata != null) {
            resolve(userdata)
            }
            else {
                reject([])
            }
        }catch(e) {
            reject(e)
        }
    })
}
 
let updateuserbyid = async (userdata)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let user = await  db.User.findOne({
                where:{id:userdata.id}
            })
            if ( user  != null) {
                user.email = userdata.email
             
                user.firstname= userdata.firstname
            
                user.lastname= userdata.lastname
           
                user.address= userdata.address
            
                user.gender= userdata.gender
            
                user.phone= userdata.phone

                await user.save()
                
            resolve(user)
            } 
            
             else {
                resolve(user)
            }
            
             
        } catch(e) {
            reject(e)
        }
    })
     
}
let deleteuserbyid = async(userid)=> {
    let user  = await db.User.findOne({where:{id:userid}})
    if (user !=null) {
        await db.User.destroy({
            where: {
              id: userid
            }
          })
    } else {
        reject("đéo cho xoa")
    }
}
 module.exports = {
    createuser:createuser,
     getalluser:getalluser,
     updateuserbyid:updateuserbyid,
     getuserbyid:getuserbyid,
     deleteuserbyid:deleteuserbyid,
     checkuserbyid:checkuserbyid
 }