import db from '../models';
import sequelize from 'sequelize'


const order  = sequelize.define('order',{total:DataTypes.INTEGER},{ timestamps: false });
/*
User.belongsToMany(Profile, { through: User_Profile });
Profile.belongsToMany(User, { through: User_Profile });
*/
db.User.belongsToMany(product,{through:order})
db.product.belongsToMany(User,{through:order})