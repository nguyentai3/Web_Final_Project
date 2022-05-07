'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dish', {
        /*
        namedish: DataTypes.STRING,
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
      namedish: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      decription: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('dish');
  }
};