import express from"express"
 import usercontroller from "../controller/usercontroller"
import homepage from "../controller/hometroller"
import auth from'../midlewave/auth'
import ordercontroller from '../controller/ordercontroller'
import admincontroller from '../controller/admincontroller'
let router = express.Router();

let initwebroute = (app) =>{
 
    router.get("/personalpage",homepage.getpersonalpage)
    
    router.get("/crud/create",homepage.crud)

    router.post("/crud/post",homepage.crudprocesssingin)


    

    router.get("/crud/get",homepage.displayalluser)




    router.get("/crud/checkuser",homepage.checkuserbyid)

    router.post("/crud/updateuser",homepage.updateinformationofuser)
    ///crud/delete?id=<%= datatable[i].id%>
    router.get("/crud/delete",homepage.deleteuserbyid)

    router.get("/api/login",usercontroller.loginpage)
    
    router.post("/api/handlelogin",usercontroller.handlelogin)

    router.post("/api/signin",usercontroller.handlesignin)
   
    router.get('/api/Shopping',ordercontroller.shoppingpage)

    router.post("/api/admin/crudproduct/addnewproduct",auth.authenloginadmin,admincontroller.addnewproduct)


    router.post("/api/admin/crudproduct/updateproduct",auth.authenloginadmin,admincontroller.updateProduct)
 
    router.get('/api/Shopping',ordercontroller.shoppingpage)

    
  

    router.post("/api/shopping",ordercontroller.Allitems)

    router.post("/api/shopping/cart",auth.authenloginuser,ordercontroller.cartofuser)

    router.post("/api/shopping/addtocart",auth.authenloginuser,ordercontroller.allProductInCart)
    
    router.get("/api/shopping/cartofuserbyid",ordercontroller.cartofuserbyid)
    

    
   
    router.post("/api/searchproductbyname",ordercontroller.search)

    router.post("/api/addproducttocart",auth.authenloginuser,ordercontroller.addproducttocart)

    router.post("/api/crud/signin",usercontroller.handlesignin)

    router.get("/api/signin",usercontroller.signin)

    router.get("/login",homepage.handlelogin)


    router.get("/api/admin/user",admincontroller.displayalluser)

    router.get("/api/admin/product",admincontroller.displayallproduct)
    router.get("/api/admin/order",admincontroller.displayallorder)


    router.post("/api/searchuser",admincontroller.searchuser)
    router.post("/api/searchrpoduct",admincontroller.searchproduct)
    router.post("/api/searchorder",admincontroller.searchorder)


    return app.use("/",router);
}

module.exports = initwebroute