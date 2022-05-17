const dotenv = require('dotenv');
 import jsonwebtoken from 'jsonwebtoken'
dotenv.config();

let createjwttoken = (userdata) =>{
     
    let accessToken = jsonwebtoken.sign( {userdata}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 10000});
 
    return accessToken
}

 

module.exports={
    createjwttoken:createjwttoken

}