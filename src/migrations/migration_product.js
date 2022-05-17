'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
     /*
      nameproduct:DataTypes.STRING,
    cost: DataTypes.DOUBLE,
    quantity:DataTypes.INT,
    decription:DataTypes.STRING
     */
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameproduct: {
        allowNull: false,
        type: Sequelize.STRING
      },
      quantity:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cost: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
     
      description: {
        type: Sequelize.STRING
      },
       
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product');
  }
};