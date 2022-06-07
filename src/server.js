 
 import express from"express";

import bodyparser from"body-parser";
import viewengine from"./config/viewEngine";
import initwebroute from"./route/web";
import  testconncet1 from "../src/config/connectDB";
import cors from 'cors'
import http from'http'
import {Server} from'socket.io'
import passport from 'passport'
const FacebookStrategy  = require('passport-facebook').Strategy
let app = express()
const session = require('express-session');
require('dotenv').config()
 
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  }));


var cookieparser = require('cookie-parser')
 

 
const server = http.createServer(app);
 
const io = new Server(server);

var path = require('path');

app.use(cors())
app.use(cookieparser())
app.options('/', cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

viewengine(app)
initwebroute(app)

testconncet1()

let port = process.env.PORT || 6969


 
 
passport.use(new FacebookStrategy({
  clientID: process.env.facebook_api_key,
  clientSecret:process.env.facebook_serect_key ,
  callbackURL: process.env.callback_url
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    //Check whether the User exists or not using profile.id
    if(config.use_database) {
       //Further code of Database.
    }
    return done(null, profile);
  });
}
));


app.listen(port,()=>{
     
    console.log(`run on port ${port}`)
})