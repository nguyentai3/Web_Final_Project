import express from"express";
import bodyparser from"body-parser";
import viewengine from"./config/viewEngine";
import initwebroute from"./route/web";
import  testconncet1 from "../src/config/connectDB";
import cors from 'cors'
var cookieparser = require('cookie-parser')
require('dotenv').config()

var path = require('path');

let app = express()

 
app.use(cors())
app.use(cookieparser())
app.options('/', cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

viewengine(app)
initwebroute(app)

testconncet1()

let port = process.env.PORT || 6969

app.listen(port,()=>{
    console.log(`run on port ${port}`)
})
