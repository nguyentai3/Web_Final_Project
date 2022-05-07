import express from"express";
import bodyparser from"body-parser";
import viewengine from"./config/viewEngine";
import initwebroute from"./route/web";
import  testconncet1 from "../src/config/connectDB";
import cors from 'cors'
var cookieparser = require('cookie-parser')
require('dotenv').config()


let app = express()


app.use(cors({origin:true}))
app.use(cookieparser())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

viewengine(app)
initwebroute(app)

testconncet1()

let port = process.env.PORT || 6969

app.listen(port,()=>{
    console.log(`run on port ${port}`)
})
