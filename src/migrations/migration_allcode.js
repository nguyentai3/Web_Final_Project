'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Allcode', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      /*
        status: DataTypes.STRING,
    chefid: DataTypes.INTEGER,
    patientid: DataTypes.INTEGER,
    date:DataTypes.DATE,
    timetype:DataTypes.STRING 
   
      */
    status: {
        type: Sequelize.STRING
      },
      chefid: {
        type: Sequelize.INTEGER
      },
      patientid: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRIDATENG
      },
      timetype: {
        type: Sequelize.STRING
      } 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Allcode');
  }
};