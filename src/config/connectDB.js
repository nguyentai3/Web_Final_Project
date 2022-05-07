const {Sequelize} = require('sequelize');
 
require('dotenv').config()
const sequelize = new Sequelize(process.env.DBdatabase,process.env.DBusername,process.env.DBpassword,{
    host:'localhost',
    dialect:'mysql',
    logging:false
})

let testconncet1 = async ()=>{
    try {
        await sequelize.authenticate();
        console.log("connect DB successfully");
    } catch(err) {
        console.log(err)
    }
}

module.exports = testconncet1