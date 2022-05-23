import db from '../models/index'
 import bcrypt from'bcrypt'
 const { Op } = require("sequelize");

 
let handleuserlogin =(email,password)=>{
    return new Promise(async (resovle,reject)=>{
        try {
            let userdata={}

            let isexitemail = await checkuseremail(email)
            if (isexitemail) {
                let user = await db.User.findOne({
                     
                    where:{email:email},
                    raw:true 
                })
               if (user) {
                    let check = await bcrypt.compareSync(password,user.password)
                    if (check) {
                        userdata.errcode=0
                        userdata.message="login successfully"
                        userdata.email=email
                        delete user.password
                        userdata.user=user
                         
                        
                        resovle(userdata)
                    } else {
                        userdata.errcode=4
                        userdata.message="password is wrong"
                         
                        resovle(userdata)
                    }
               } else {
                userdata.errcode='2'
                userdata.message='user is not exist'
                resovle(userdata)
               }
            } else {
                userdata.errcode='1'
                userdata.message='your email is not exist'
                resovle(userdata)
            }
        } catch(e) {
            reject(e)
        }

    })

}

let getuserbyid = async (id) =>{
    return new Promise(async (resolve,reject)=>{
        try {
            let user = await db.User.findOne({
                where:{id:id}
            })
            resolve(user)
        } catch(e) {
            reject(e)
        }
        

    })
} 


let checkuseremail = (email)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let user = await db.User.findOne({
                where :{email:email}  
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch(e) {
            reject(e)
        }
    })
}
 
 

let searchuserbyid = async (email) =>{
    return new Promise(async(resovle,reject)=>{
        try {
           if (email) {
            let user  = await   db.User.findAll( {
                where:{
                    email: {
                        // *name* trong query 
                        [Op.regexp]:email
                    }
                }
            });
            
            resovle(user)
           } else {
            let user  = await   db.User.findAll();
            
            resovle(user)
           }
        
            
        } catch(e) {
            reject(e)
        }
    })
}

let showAllUser = async ()=>{
    let list = await db.User.findAll()
    return list
    

}

 
 

module.exports= {
    handleuserlogin:handleuserlogin,
    checkuseremail:checkuseremail,
    showAllUser:showAllUser,
    getuserbyid:getuserbyid,
    searchuserbyid:searchuserbyid
}