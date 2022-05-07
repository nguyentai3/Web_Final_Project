'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('history', {
        /*
        userid: DataTypes.INTEGER,
    orderid: DataTypes.INTEGER,
    description: DataTypes.STRING,
        */
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    userid: {
 
        type: Sequelize.INTEGER
      },
      orderid: {
        type: Sequelize.INTEGER
      },

      description: {
        type: Sequelize.STRING
      },
       
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('history');
  }
};