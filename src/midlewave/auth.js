import bcrypt from'bcrypt'
import jwt from "jsonwebtoken"
import res from 'express/lib/response';
import  jwttoken from '../sevice/jwttoken'
import ordercrud from'../sevice/order_crud'

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
        // console.log(decoded.userdata.user.roleid)
        if(decoded.userdata.user.roleid === "USER" || decoded.userdata.user.roleid === "ADMIN"){
          return next();
        } else {
          res.status(403).json({message:"Chi dành cho User"})
        }
         
       
        } catch(err) {
        return res.status(401).json({message:"Invalid token"})
      }
        

      
    }
    


}

let authenloginadmin = async(req,res,next)=>{
     
  let token  = req.body.token || req.query.token || req.headers['access-token']
  if (!token) {
      return res.status(403).send("A token is required for authentication");
  }
  else {
    try {
      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.decoded = decoded;
       console.log(decoded.userdata.user.roleid)
      if(decoded.userdata.user.roleid === "ADMIN"){
        return next();
      } else {
        res.status(403).json({message:"Chi dành cho AMIN"})
      }
       
     
    } catch(err) {
      return res.status(401).json({message:"Invalid token"})
    }
      

    
  }
  


}


let authenuertopurchase = async (req,res,next)=>{

  let token  = req.body.token || req.query.token || req.headers['access-token']

  if (token) {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    let order = await ordercrud.findorderbyid(req.body.idorder)
    
    console.log(order)
    console.log(decoded)
    if (order.dataValues.iduser === decoded.userdata.user.id) {
      next()
    } else {
      res.status(301).json({
        message:"invalue user"
      })
    }


  } else {
    res.status(400).json({
      message:"not have token"
    })
  }


}

let handleupfile = async(req,res,next) =>{
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
      var newpath = 'C:/Users/Your Name/' + files.filetoupload.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        req.fields;  
        req.files;
      });
 });
  next()
}
}

module.exports = {
  authenloginuser:authenloginuser,
  authenloginadmin:authenloginadmin,
  authenuertopurchase:authenuertopurchase,
  handleupfile:handleupfile
}