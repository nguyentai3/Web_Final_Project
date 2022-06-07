import axios from "axios";

import config from '../config/config.json'
import fs from 'fs'
import moment from'moment'
import cryto from'crypto-js'
import mac from'./Mac'

 let uid = Date.now();
 

let hmac_algorithm = (data)=>{
    let a = cryto.HmacSHA256(data,config.key1).toString()
    return a
}
let hmacinput= (data)=>{
    return data.appid +"|"+data.apptransid +"|"+data.appuser+"|"+data.amount+"|"+data.apptime+"|"+data.embeddata +"|"+data.item
}
let transid = () =>{
    return `${moment().format('YYMMDD')}_${config.appid}_${++uid}`;
}


let neworder=(amount,description)=>{
    return {
        amount,
        description,
        appid:config.appid,
        appuser:"Demo",
        embeddata:JSON.stringify({
            promotioninfo:"",merchantinfo:"du lieu rieng cua ung dung"
        }),
        item: JSON.stringify([
            { name: "demo ",item: amount }
          ]),
        apptime: Date.now(),
        apptransid: transid(),
    }
}


let createorder = async(data) =>{
    return new Promise(async(resovle,reject)=>{
         try {
             let order = neworder(data)
             order.mac = mac.Mac.CreateOrder(order)
            let result = await axios.post("https://sandbox.zalopay.com.vn/v001/tpe/createorder",null,{
            params:order
        })
            resovle(result)
         } catch(e) {
             reject(e)
         }
    }
    )
        
    }



module.exports={createorder:createorder}
