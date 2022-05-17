'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
     
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
 
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },

      lastname: {
        type: Sequelize.STRING
      },
      password :{
        type : Sequelize.STRING
    },
      address :{
          type : Sequelize.STRING
      },
      gender :{
        type : Sequelize.BOOLEAN
    },
    phone :{
        type : Sequelize.STRING
    },
    roleid :{
        type : Sequelize.STRING
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};