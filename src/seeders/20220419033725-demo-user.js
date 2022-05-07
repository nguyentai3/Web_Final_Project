'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users',[{
      /*
      email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    roleid: DataTypes.STRING
       */
    email:'example@gmail.com',
      firstName:'Jonh1',
      lastName:'Doe',
      address:"Viet Nam",
      gender:true,
      roleid:"ADMIN",
      createdAt:12/12/2022,
      updatedAt:12/12/2022
      
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
