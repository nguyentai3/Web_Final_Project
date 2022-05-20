'use strict';
const {
  Model, or
} = require('sequelize');
import product from '../models/product'
import User from '../models/user'
import db from '../models';

module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    /* models.User.belongsToMany(models.product,{through:order})
      models.product.belongsToMany(models.User,{through:order})*/
    }
  }
  order.init({
    iduser:{
      type: DataTypes.INTEGER,
      references:{
        model:db.User,
        key:'id'
      }
    },
    idproduct:{
      type:DataTypes.INTEGER,
      references:{
        model:db.product,
        key:'id'
      }
    },
     
    amount:{
      type:DataTypes.INTEGER
    },
    paymentmethob:{
      type: DataTypes.STRING
    }
  
  }, {
    sequelize,
    modelName: 'order',
  });

  

  return order;
};