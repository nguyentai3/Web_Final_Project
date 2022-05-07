'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
        /*
        email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    roleid: DataTypes.STRING
    
        */
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
        typeL : Sequelize.STRING
    },
      address :{
          typeL : Sequelize.STRING
      },
      gender :{
        typeL : Sequelize.BOOLEAN
    },
    phone :{
        typeL : Sequelize.STRING
    },
    roleid :{
        typeL : Sequelize.STRING
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};