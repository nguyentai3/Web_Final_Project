import userservice from '../sevice/userservice'
import jwt from'jsonwebtoken'
import  jwttoken from '../sevice/jwttoken'
import crudservice from"../sevice/crud_user";
 const querystring = require('query-string')
import producCrud from '../sevice/product_crud'
import orders_crud from '../sevice/order_crud'
import db from '../models';
import momo from'../sevice/momo-payment'


const stripe = require("stripe")("sk_test_51L6bPnAV6sD26C2sFGngpkSmOiW5cGER1zvt0B7ZLbbUmOR5mwahAYZzBeTgQEA2UELNJgkod635T7yME8jms7lV00iK8xNHRv");

let loginpage =(req,res) =>{
    res.render("pages/login.ejs",{
        message:""
    })
}

let handlelogin = async (req,res)=>{
    let email  = req.body.email
    let password = req.body.password 
     
    //check missing inputs
    if (!email || !password) {
        return res.render('pages/login.ejs',{
            message:"missing input"
    
        })
    }
    //check email exist

    let userdata  = await userservice.handleuserlogin(email,password)
     
    /*
         userdata.errcode=4
                        userdata.message="password is wrong"
                         
                        resovle(userdata)
    */
    if (userdata.errcode == 4) {
        return res.render('pages/login.ejs',{
            message:userdata.message
    
        })
    } else { 
    console.log(userdata)
    let token =  jwttoken.createjwttoken(userdata)
    token = await jwttoken.createjwttoken(userdata)

    const decode = jwt.decode(token)

    let productlist = await producCrud.getAllProduct()
     
    if (userdata.user.roleid ==='USER') {
        return res.render('pages/Shopping.ejs',{
            id:decode.userdata.user.id,
            token :token,
            productlist :productlist
    
        })
    } else   {
        let list = await crudservice.getalluser();
        let produtcs = await producCrud.getAllProduct();
        let orderlist = await orders_crud.showAllorders();
        let result = []
        for (var i =0;i<orderlist.lenght;i++) {
        let product = await producCrud.findProductbyId(orderlist[i].idproduct)
        let cost = product.dataValues.cost * orderlist[i].amount

        result.push({
            id: orderlist[i].id,
            iduser: orderlist[i].iduser,
            idproduct: orderlist[i].idproduct,
            amount: orderlist[i].amount,
            paymentmethob: orderlist[i].paymentmethob,
            createdAt: orderlist[i].createdAt,
            cost: cost
        })
    }


 
      res.render("displayuserlist.ejs",{
        datatable:list,
        productlist:produtcs,
        orderlist:orderlist,
        token:token
    })  
    } 
}
       /* 
    res.status(200).json({
        message:"sản phẩm hiện có",
        productList:productlist
    })
    data1:JSON.stringify(data1)
*/
}
let handlesignin = async (req,res)=>{
 
    let userdata = {
                email: req.body.email,
                firstname:  req.body.firstname,
                lastname:  req.body.lastname,
                password:req.body.password,
                address:  req.body.address,
                gender: req.body.gender ,
                phone: req.body.phone,
                
    }
 
    let user = await crudservice.createuser(userdata)
    
    let token =  jwttoken.createjwttoken(user)
    token = await jwttoken.createjwttoken(user)

    const decode = jwt.decode(token)

    let productlist = await producCrud.getAllProduct()
     
    if (userdata.user.roleid ==='USER') {
        return res.render('pages/Shopping.ejs',{
            id:decode.userdata.user.id,
            token :token,
            productlist :productlist
    
        })
    



}}
 
/**
 * 
 * <form action="/api/user/cart/payment" method="post">
            <input value="<%=productlist[i].id%>" name="orderid" type="text"  style="display:none"/>
            <input value="<%=productlist[i].Name%>" name="nameproduct" type="text"  style="display:none"/>
            <input value="<%=productlist[i].cost%>" name="cost" type="text"  style="display:none"/>
            <input value="<%=productlist[i].amount%>" name="amount" type="text"  style="display:none"/>
            <input value="<%=productlist[i].Date%>" name="Date" type="text"  style="display:none"/>
            <input value="<%=productlist[i].status%>" name="status" type="text"  style="display:none"/>
             

           <input  value="Pay" type="submit" class="btn-delete" />
        </form>
 */
/*let pay =async () => {
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var orderInfo = 'pay with MoMo';
    var partnerCode = 'MOMO';
    var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    var amount = '50000';
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData ='';
    var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
    var orderGroupId ='';
    var autoCapture =true;
    var lang = 'vi';
    
    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&paymentCode=" + paymentCode + "&requestId=" + requestId;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    //signature
    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)
    
    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode : partnerCode,
        partnerName : "Test",
        storeId : "MomoTestStore",
        requestId : requestId,
        amount : amount,
        orderId : orderId,
        orderInfo : orderInfo,
        redirectUrl : redirectUrl,
        ipnUrl : ipnUrl,
        lang : lang,
        autoCapture: autoCapture,
        extraData : extraData,
        paymentCode : paymentCode,
        orderGroupId: orderGroupId,
        signature : signature
    });
    //Create the HTTPS objects
    const https = require('https');
    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/pos',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        }
    }
    //Send the request and get the response
    const req = https.request(options, res => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (body) => {
            console.log('Body: ');
            console.log(body);
            console.log('resultCode: ');
            console.log(JSON.parse(body).resultCode);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    })
    
    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });
    // write data to request body
    console.log("Sending....")
    req.write(requestBody);
    req.end();
     
};*/
let signin = (req,res)=>{
    res.render("pages/Signin.ejs")
}

let cancleorer = async(req,res) =>{
    
    await orders_crud.deleteorder(req.query.idorder)
     
    let productlist = await orders_crud.showAllProductInCart(req.query.iduser)
     
    let result = await orders_crud.productlistofcart(productlist)

    let total =  await  orders_crud.totalcost(productlist)
    total = total.toFixed(2) 
   /* res.json({
        message:"them vao vo hang",
        productlist:productlist ,
        total:total
    })*/
     
    res.render("pages/Cart.ejs",{
         
        iduser:req.query.iduser,
        productlist:result ,
        total:total
    }) 

}

let pagesuccess = (req,res)=>{
    res.render("pages/success.html")
}

let paypages = async (req,res)=>{
    
    let orderi = await db.order.findOne({
        where:{
            id :req.body.total
        }
    })
     

   
}

module.exports={
    paypages:paypages,
    pagesuccess:pagesuccess,
    handlelogin:handlelogin,
    loginpage:loginpage,
    handlesignin:handlesignin,
    cancleorer:cancleorer,
    signin:signin 
}