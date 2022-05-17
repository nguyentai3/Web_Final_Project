'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order', {
     
    id: {
        allowNull: false,
        autoIncrement: true,
        
        type: Sequelize.INTEGER
    },
    iduser:{
        type: Sequelize.INTEGER,
         
    },

    idproduct:{
            type: Sequelize.INTEGER,
             
    },
    amount:{
        type:Sequelize.INTEGER
      },
    paymentmethob:{
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order');
  }
};