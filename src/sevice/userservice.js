import db from '../models/index'
import crud from '../sevice/crud_user'
import bcrypt from'bcrypt'
import { reject } from 'bcrypt/promises'
 
 
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

 

 

module.exports= {
    handleuserlogin:handleuserlogin,
    checkuseremail:checkuseremail
}