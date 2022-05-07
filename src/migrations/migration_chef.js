'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chef', {
        /*
       namechef: DataTypes.STRING,
    price: DataTypes.INTEGER,
    decription:DataTypes.TEXT,
    status:DataTypes.STRING,
   image:DataTypes.STRING
        */
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namechef: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
     
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('chef');
  }
};