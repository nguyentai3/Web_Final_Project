import bcrypt from'bcrypt'
import jwt from "jsonwebtoken"
import res from 'express/lib/response';
import  jwttoken from '../sevice/jwttoken'
require('dotenv').config()
let authenloginuser = async(req,res,next)=>{
     
    let token  = req.body.token || req.query.token || req.headers['access-token']
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    else {
      try {
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.decoded = decoded;
         console.log(decoded.userdata.user.roleid)
        if(decoded.userdata.user.roleid === "USER"){
          return next();
        } else {
          res.status(403).json({message:"Chi dành cho User"})
        }
         
       
      } catch(err) {
        return res.status(401).json({message:"Invalid token"})
      }
        

      
    }
    


}

module.exports = {
  authenloginuser:authenloginuser
}